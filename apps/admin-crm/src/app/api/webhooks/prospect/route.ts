import { NextResponse } from 'next/server';
import { prisma } from '@live-style/database';
import { addProspectToAutomation } from '@live-style/queue';

// This is a public endpoint that external services (Typeform, Zapier, Webhooks) can call
export async function POST(request: Request) {
  try {
    // 1. Check for a basic API key to prevent spam (optional but recommended)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET || 'live-style-secret'}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse the incoming lead data
    const body = await request.json();
    const { name, platform, contactInfo } = body;

    if (!name || !platform) {
      return NextResponse.json({ error: 'Missing required fields: name, platform' }, { status: 400 });
    }

    // 3. Find the "New Leads" stage (usually order: 1)
    let newLeadsStage = await prisma.pipelineStage.findFirst({
      where: { order: 1 }
    });

    // Fallback if the stage was deleted or renamed
    if (!newLeadsStage) {
      newLeadsStage = await prisma.pipelineStage.findFirst();
      if (!newLeadsStage) {
          return NextResponse.json({ error: 'No pipeline stages configured' }, { status: 500 });
      }
    }

    // 4. Create the Prospect in the database
    const newProspect = await prisma.prospect.create({
      data: {
        name,
        platform,
        contactInfo: contactInfo ? contactInfo : {},
        stageId: newLeadsStage.id,
        status: 'NEW',
      }
    });

    // 5. Trigger the Background Worker!
    try {
      await addProspectToAutomation(newProspect.id);
    } catch (queueError) {
      console.warn("Could not add prospect to queue (is Redis running?):", queueError);
    }

    // 6. Return success
    return NextResponse.json({ 
      success: true, 
      message: 'Prospect captured and automation triggered!',
      prospectId: newProspect.id 
    }, { status: 201 });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
