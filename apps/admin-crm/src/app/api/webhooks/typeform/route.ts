import { NextResponse } from 'next/server';
import { prisma } from '@live-style/database';

/**
 * Typeform Webhook Handler
 * Maps Typeform form_response to our native CRM 2.0 Lead model.
 */
export async function POST(request: Request) {
  try {
    // 1. Verification (Typeform secret if configured)
    const signature = request.headers.get('typeform-signature');
    // In production, you would verify this signature using a secret
    
    const body = await request.json();
    const { form_response } = body;

    if (!form_response) {
      return NextResponse.json({ error: 'Invalid Typeform payload' }, { status: 400 });
    }

    const { form_id, answers, hidden, variables, calculated } = form_response;

    // 2. Identify the Funnel (Filters)
    const funnelMapping: Record<string, string> = {
      'ebook-form-id': 'funnel-e-book',
      'indicacao-form-id': 'funnel-indicação',
      'organico-form-id': 'funnel-orgânico',
      'perpetuo-form-id': 'funnel-perpétuo',
      'social-selling-id': 'funnel-social-selling',
    };

    const funnelId = funnelMapping[form_id] || 'funnel-orgânico';

    // 3. Find the Global "Preencheu Formulário" stage (order: 2)
    const targetStage = await prisma.stage.findFirst({
      where: { 
        order: 2 // 'Preencheu Formulário'
      }
    });

    if (!targetStage) {
       return NextResponse.json({ error: 'Global CRM Stages not configured' }, { status: 500 });
    }

    // 4. Extract Lead Data from Answers
    let leadEmail = '';
    let leadWhatsapp = '';
    let leadName = 'Lead from Typeform';
    const properties: Record<string, any> = {};

    for (const answer of answers) {
      const fieldRef = answer.field.ref || answer.field.id;
      let value: any = null;

      switch (answer.type) {
        case 'text': value = answer.text; break;
        case 'email': value = answer.email; leadEmail = answer.email; break;
        case 'number': value = answer.number; break;
        case 'boolean': value = answer.boolean; break;
        case 'date': value = answer.date; break;
        case 'choice': value = answer.choice.label; break;
        case 'choices': value = answer.choices.labels; break;
        case 'phone_number': value = answer.phone_number; leadWhatsapp = answer.phone_number; break;
        default: value = answer[answer.type];
      }

      if (fieldRef === 'user_name' || fieldRef.includes('nome')) leadName = value;
      if (fieldRef === 'user_email' && !leadEmail) leadEmail = value;
      if (fieldRef === 'user_whatsapp' && !leadWhatsapp) leadWhatsapp = value;

      properties[fieldRef] = value;
    }

    const utms: Record<string, string> = {};
    if (hidden) {
      Object.entries(hidden).forEach(([key, val]) => {
        if (key.startsWith('utm_')) {
          utms[key.replace('utm_', '')] = val as string;
        } else {
          properties[`hidden_${key}`] = val;
        }
      });
    }

    // 5. Create or Update the Lead
    const lead = await prisma.lead.upsert({
      where: { email: leadEmail || `tf_${form_id}_${Date.now()}@noemail.com` },
      update: {
        name: leadName,
        whatsapp: leadWhatsapp || undefined,
        stageId: targetStage.id,
        funnelId: funnelId, // Ensure funnel filter is updated
        properties: {
          ...(typeof lead?.properties === 'object' ? lead.properties : {}),
          ...properties
        },
        utms: {
          ...(typeof lead?.utms === 'object' ? lead.utms : {}),
          ...utms
        }
      },
      create: {
        name: leadName,
        email: leadEmail || null,
        whatsapp: leadWhatsapp,
        funnelId: funnelId,
        stageId: targetStage.id,
        properties: properties,
        utms: utms,
      }
    });

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      funnel: funnelId,
      stage: targetStage.name
    }, { status: 201 });

  } catch (error: any) {
    console.error('Typeform Webhook Error:', error);
    return NextResponse.json({ error: 'Internal server error', detail: error.message }, { status: 500 });
  }
}
