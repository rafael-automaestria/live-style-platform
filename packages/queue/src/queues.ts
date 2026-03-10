import { Queue } from 'bullmq';
import { connection } from './client';

export const automationQueue = new Queue('prospect-automation', { connection });

export async function addProspectToAutomation(prospectId: string) {
  await automationQueue.add(
    'contact-new-lead',
    { prospectId },
    { delay: 5000 } // Add a 5 second delay to simulate human-like workflow
  );
}
