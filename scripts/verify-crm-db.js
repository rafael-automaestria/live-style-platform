const { prisma } = require('../packages/database/src/index');

async function verifyDb() {
  console.log('--- Verificando Banco de Dados CRM 2.0 ---');
  
  // 1. List Funnels
  const funnels = await prisma.funnel.findMany({ include: { stages: true } });
  console.log(`Funis encontrados: ${funnels.length}`);
  funnels.forEach(f => {
    console.log(`- ${f.name} (${f.stages.length} etapas)`);
  });

  // 2. Mock a Lead creation (Simulating Webhook result)
  const funnelId = funnels[0]?.id; // E-book or similar
  const stageId = funnels[0]?.stages.find(s => s.order === 2)?.id;

  if (funnelId && stageId) {
    const testLead = await prisma.lead.upsert({
      where: { email: 'vibe-ceo-test@livestyle.com' },
      update: {},
      create: {
        name: 'Vibe CEO Test',
        email: 'vibe-ceo-test@livestyle.com',
        whatsapp: '+5511988887777',
        funnelId,
        stageId,
        properties: {
          historia: 'Sou o CEO da Live Style testando o sistema.',
          sonho: 'Automatizar tudo com o Gemini CLI.',
          disponibilidade: '6-7x por semana'
        },
        utms: {
          source: 'gemini-cli',
          medium: 'automation'
        }
      }
    });
    console.log(`✅ Lead de teste criado/verificado: ${testLead.name} (ID: ${testLead.id})`);
    console.log(`📍 Etapa: ${testLead.stageId} (Funil: ${testLead.funnelId})`);
  } else {
    console.error('❌ Erro: Funil ou Etapa não encontrados. Rode o seed primeiro.');
  }
}

verifyDb().catch(console.error).finally(() => prisma.$disconnect());
