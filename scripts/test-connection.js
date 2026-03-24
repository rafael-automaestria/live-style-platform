const { PrismaClient } = require('@prisma/client');

// A senha codificada: zvp3NFM.mzf%21mkd8xpu
const dbUrl = "postgresql://postgres:zvp3NFM.mzf%21mkd8xpu@db.tvanfxduosucmdtoiruq.supabase.co:5432/postgres?connection_limit=1";

async function testConnection() {
  console.log('🔍 Testando conexão com o banco de dados Supabase...');
  console.log('📡 URL:', dbUrl.replace(/:[^:]+@/, ':****@')); // Esconde a senha no log

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });

  try {
    const startTime = Date.now();
    // Executa uma query simples
    const result = await prisma.$queryRaw`SELECT NOW() as now, current_database() as db, current_user as user`;
    const duration = Date.now() - startTime;

    console.log('✅ CONEXÃO BEM-SUCEDIDA!');
    console.log('⏱️  Latência:', duration, 'ms');
    console.log('📊 Dados da Sessão:', result[0]);
    
    // Testa contagem de usuários
    const userCount = await prisma.user.count();
    console.log('👥 Total de Usuários no Banco:', userCount);

  } catch (error) {
    console.error('❌ ERRO DE CONEXÃO:');
    if (error.message.includes('server_login_retry')) {
      console.error('👉 Motivo: O Supabase bloqueou temporariamente o login por excesso de tentativas falhas.');
      console.error('👉 Solução: Aguarde 1 minuto e tente novamente.');
    } else if (error.message.includes('Authentication failed')) {
      console.error('👉 Motivo: Senha ou usuário incorretos.');
    } else {
      console.error(error.message);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
