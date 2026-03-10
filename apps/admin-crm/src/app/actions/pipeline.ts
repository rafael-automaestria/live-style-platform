'use server';

import { prisma } from '@live-style/database';
import { revalidatePath } from 'next/cache';

export async function getPipelineData() {
  const stages = await prisma.pipelineStage.findMany({
    orderBy: { order: 'asc' },
    include: {
      prospects: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });
  return stages;
}

export async function addProspect(formData: FormData) {
  const name = formData.get('name') as string;
  const platform = formData.get('platform') as string;
  const stageId = formData.get('stageId') as string;

  if (!name || !platform || !stageId) {
    throw new Error('Missing required fields');
  }

  await prisma.prospect.create({
    data: {
      name,
      platform,
      stageId,
      status: 'NEW',
    }
  });

  revalidatePath('/dashboard/pipeline');
}

export async function moveProspect(prospectId: string, newStageId: string) {
  await prisma.prospect.update({
    where: { id: prospectId },
    data: { stageId: newStageId }
  });

  revalidatePath('/dashboard/pipeline');
}
