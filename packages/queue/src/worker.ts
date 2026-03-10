import { Worker, Job } from 'bullmq';
import { connection } from './client';
import { prisma } from '@live-style/database';

export function startWorker() {
  console.log('🤖 Automation Worker started. Listening for prospect events...');

  const worker = new Worker(
    'prospect-automation',
    async (job: Job) => {
      console.log(`[Job ${job.id}] Processing prospect automation for ID: ${job.data.prospectId}`);
      const { prospectId } = job.data;

      const prospect = await prisma.prospect.findUnique({ where: { id: prospectId } });
      if (!prospect) {
        throw new Error(`Prospect ${prospectId} not found`);
      }

      // Find the 'Contacted' stage
      const contactedStage = await prisma.pipelineStage.findFirst({
        where: { name: 'Contacted' } // Assuming this exists based on seed
      });

      if (!contactedStage) {
        console.error('Contacted stage not found. Cannot move prospect.');
        return;
      }

      // Simulate sending a WhatsApp message by creating a Message log
      await prisma.message.create({
        data: {
          prospectId,
          channel: 'WHATSAPP',
          direction: 'OUTBOUND',
          content: `Hi ${prospect.name.split(' ')[0]}! We saw your amazing talent and would love to talk about joining Live Style Agency. Are you open to a quick chat?`,
        }
      });

      // Move prospect to 'Contacted' stage
      await prisma.prospect.update({
        where: { id: prospectId },
        data: { stageId: contactedStage.id }
      });

      console.log(`✅ [Job ${job.id}] Automatically moved ${prospect.name} to Contacted stage and sent WhatsApp!`);
    },
    { connection: connection as any }
  );

  worker.on('failed', (job, err) => {
    console.error(`❌ [Job ${job?.id}] Failed: ${err.message}`);
  });

  return worker;
}

// Start immediately if executed directly
if (require.main === module) {
  startWorker();
}
