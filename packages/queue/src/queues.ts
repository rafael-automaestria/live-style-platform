import { Queue } from 'bullmq';
import { connection } from './client';

// Safely instantiate queue only if connection exists (not during Vercel build)
export const automationQueue = connection ? new Queue('prospect-automation', { connection: connection as any }) : null as any;

export async function addProspectToAutomation(prospectId: string) {
  if (!automationQueue) return;
  
  await automationQueue.add(
    'contact-new-lead',
    { prospectId },
    { delay: 5000 } // Add a 5 second delay to simulate human-like workflow
  );
}
