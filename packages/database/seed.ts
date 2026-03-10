import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@livestyle.com' },
    update: {},
    create: {
      email: 'admin@livestyle.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const partnerPassword = await bcrypt.hash('partner123', 10);
  const partnerUser = await prisma.user.upsert({
    where: { email: 'partner@livestyle.com' },
    update: {},
    create: {
      email: 'partner@livestyle.com',
      name: 'Super Partner',
      password: partnerPassword,
      role: 'PARTNER',
    },
  });

  const stages = [
    { name: 'New Leads', order: 1 },
    { name: 'Contacted', order: 2 },
    { name: 'Evaluating', order: 3 },
    { name: 'Approved', order: 4 },
    { name: 'Onboarding', order: 5 },
  ];

  for (const stage of stages) {
    const existing = await prisma.pipelineStage.findFirst({
      where: { name: stage.name }
    });
    if (!existing) {
      await prisma.pipelineStage.create({
        data: stage
      });
    }
  }

  // --- Seed Partner Portal Courses ---
  const existingCourse = await prisma.course.findFirst({ where: { title: 'TikTok Live Masterclass' }});
  if (!existingCourse) {
    const course = await prisma.course.create({
      data: {
        title: 'TikTok Live Masterclass',
        description: 'The ultimate guide to doubling your gifts and retaining viewers during prime time.',
        thumbnail: 'from-amber-500 to-orange-700',
        modules: {
          create: [
            {
              title: 'Module 1: The Basics of Engagement',
              order: 1,
              lessons: {
                create: [
                  { title: 'Hooking your audience in 3 seconds', order: 1, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                  { title: 'Lighting and Audio Setup', order: 2, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
                ]
              }
            },
            {
              title: 'Module 2: Advanced Gift Strategies',
              order: 2,
              lessons: {
                create: [
                  { title: 'Psychology of Gifting', order: 1, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                  { title: 'Running successful PK Battles', order: 2, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
                ]
              }
            }
          ]
        }
      }
    });

    // Enroll the partner
    await prisma.enrollment.create({
      data: {
        userId: partnerUser.id,
        courseId: course.id
      }
    });
  }

  console.log('Seed completed.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
