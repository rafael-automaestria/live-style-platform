'use server';

import { prisma } from '@live-style/database';
import { revalidatePath } from 'next/cache';

export async function getPipelineData(funnelId?: string) {
  const stages = await prisma.stage.findMany({
    orderBy: { order: 'asc' },
    include: {
      leads: {
        where: funnelId ? { funnelId } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          funnel: true,
          stage: true
        }
      }
    }
  });
  return stages;
}

export async function getFunnels() {
  return await prisma.funnel.findMany({
    orderBy: { createdAt: 'asc' }
  });
}

export async function addProspect(formData: FormData) {
  const name = formData.get('name') as string;
  const platform = formData.get('platform') as string;
  const stageId = formData.get('stageId') as string;

  if (!name || !platform || !stageId) {
    throw new Error('Missing required fields');
  }

  // Get first available funnel to associate the lead
  const funnel = await prisma.funnel.findFirst();

  await prisma.lead.create({
    data: {
      name,
      stageId,
      funnelId: funnel?.id || '',
      status: 'NEW',
    }
  });

  revalidatePath('/dashboard/pipeline');
}

export async function moveProspect(prospectId: string, newStageId: string) {
  await prisma.lead.update({
    where: { id: prospectId },
    data: { stageId: newStageId }
  });

  revalidatePath('/dashboard/pipeline');
}
