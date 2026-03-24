'use server';

import { prisma } from '@live-style/database';
import { revalidatePath } from 'next/cache';

export async function getInboxData() {
  const leads = await prisma.lead.findMany({
    include: {
      messages: {
        orderBy: { createdAt: 'asc' }
      },
      stage: true
    },
    orderBy: { updatedAt: 'desc' }
  });
  return leads;
}

export async function sendMessage(leadId: string, content: string, channel: string = 'WHATSAPP') {
  if (!content.trim()) return;

  await prisma.message.create({
    data: {
      leadId,
      content,
      channel,
      direction: 'OUTBOUND'
    }
  });

  // Update lead's updatedAt so it bumps to the top of the inbox
  await prisma.lead.update({
    where: { id: leadId },
    data: { updatedAt: new Date() }
  });

  revalidatePath('/dashboard/inbox');
}
