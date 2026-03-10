import IORedis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Only instantiate Redis if we are NOT building on Vercel
// This prevents SSR pre-rendering from attempting to connect to localhost redis
export const connection = process.env.NEXT_PHASE === 'phase-production-build' 
  ? null as any 
  : new IORedis(REDIS_URL, { maxRetriesPerRequest: null });
