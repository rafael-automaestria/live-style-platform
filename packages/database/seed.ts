import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // --- Admin User ---
  const adminPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@livestyle.com' },
    update: {},
    create: {
      email: 'admin@livestyle.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // --- Partner User ---
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

  // --- CRM Funnels (Global Filters) ---
  const funnelNames = [
    'E-book',
    'Indicação',
    'Orgânico',
    'Perpétuo',
    'Lançamento',
    'Social Selling',
  ];

  for (const fName of funnelNames) {
    await prisma.funnel.upsert({
      where: { id: `funnel-${fName.toLowerCase().replace(/\s+/g, '-')}` },
      update: { name: fName },
      create: {
        id: `funnel-${fName.toLowerCase().replace(/\s+/g, '-')}`,
        name: fName,
      },
    });
  }

  // --- CRM Stages (Global / Shared across all funnels) ---
  const stageNames = [
    'Compra Aprovada',
    'Preencheu Formulário',
    'Contato Inicial',
    'Enviar Instruções da Live',
    'Aguardando Live Teste',
    'Cadastro no Backstage',
    'Cadastro na Plataforma',
    'Ativos',
    'Outras Etapas (Rejeitados / Arquivados)',
  ];

  for (let i = 0; i < stageNames.length; i++) {
    await prisma.stage.upsert({
      where: { id: `stage-global-${i + 1}` },
      update: { name: stageNames[i], order: i + 1 },
      create: {
        id: `stage-global-${i + 1}`,
        name: stageNames[i],
        order: i + 1,
      },
    });
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

  console.log('Seed completed successfully for CRM 2.0 (Shared Stages).');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
