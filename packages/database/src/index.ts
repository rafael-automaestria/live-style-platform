import { PrismaClient } from '@prisma/client';

export * from '@prisma/client';

// Use a Symbol to ensure the singleton is truly unique across all reloads
const PRISMA_SINGLETON_KEY = Symbol.for('live-style.prisma.singleton');

const globalForPrisma = globalThis as unknown as {
  [PRISMA_SINGLETON_KEY]: PrismaClient | undefined;
};

if (!globalForPrisma[PRISMA_SINGLETON_KEY]) {
  console.log('[Prisma] Initializing singleton PrismaClient instance...');
}

export const prisma = globalForPrisma[PRISMA_SINGLETON_KEY] ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma[PRISMA_SINGLETON_KEY] = prisma;
}
