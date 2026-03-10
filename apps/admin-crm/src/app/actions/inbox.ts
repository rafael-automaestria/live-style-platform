'use server';

import { prisma } from '@live-style/database';
import { revalidatePath } from 'next/cache';

export async function getInboxData() {
  const prospects = await prisma.prospect.findMany({
    include: {
      messages: {
        orderBy: { createdAt: 'asc' }
      },
      stage: true
    },
    orderBy: { updatedAt: 'desc' }
  });
  return prospects;
}

export async function sendMessage(prospectId: string, content: string, channel: string = 'WHATSAPP') {
  if (!content.trim()) return;

  await prisma.message.create({
    data: {
      prospectId,
      content,
      channel,
      direction: 'OUTBOUND'
    }
  });

  // Update prospect's updatedAt so it bumps to the top of the inbox
  await prisma.prospect.update({
    where: { id: prospectId },
    data: { updatedAt: new Date() }
  });

  revalidatePath('/dashboard/inbox');
}
