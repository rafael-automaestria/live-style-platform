'use server';

import { prisma } from '@live-style/database';

export async function getDashboardStats() {
  const [totalProspects, activePartners, totalMessages] = await Promise.all([
    prisma.lead.count(),
    prisma.user.count({ where: { role: 'PARTNER' } }),
    prisma.message.count(),
  ]);

  // Get count of prospects grouped by pipeline stage
  const prospectsByStage = await prisma.stage.findMany({
    orderBy: { order: 'asc' },
    select: {
      name: true,
      _count: {
        select: { leads: true }
      }
    }
  });

  const funnelData = prospectsByStage.map((stage: { name: string; _count: { leads: number } }) => ({
    name: stage.name,
    value: stage._count.leads
  }));

  // Simulate some monthly growth data for the line chart
  const growthData = [
    { name: 'Jan', artists: 12, messages: 150 },
    { name: 'Feb', artists: 19, messages: 320 },
    { name: 'Mar', artists: 25, messages: 480 },
    { name: 'Apr', artists: 32, messages: 850 },
    { name: 'May', artists: Math.max(32, totalProspects + activePartners), messages: Math.max(850, totalMessages) },
  ];

  return {
    totalProspects,
    activePartners,
    totalMessages,
    funnelData,
    growthData
  };
}
