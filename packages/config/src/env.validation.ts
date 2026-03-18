// BidFlow — Environment variable validation
// Use this in main.ts to fail fast on misconfiguration.
// Integration: import { validateEnv } from '@bidflow/config'; validateEnv();

type EnvConfig = {
  DATABASE_URL:  string;
  JWT_SECRET:    string;
  PORT?:         string;
  NODE_ENV?:     string;
};

export function validateEnv(): void {
  const required: (keyof EnvConfig)[] = ['DATABASE_URL', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `[BidFlow] Missing required environment variables:\n` +
      missing.map(k => `  - ${k}`).join('\n') +
      `\n\nCopy .env.example to .env and fill in the values.`
    );
  }

  if (process.env.NODE_ENV === 'production') {
    const jwtSecret = process.env.JWT_SECRET!;
    if (jwtSecret.length < 32) {
      throw new Error('[BidFlow] JWT_SECRET must be at least 32 characters in production.');
    }
    if (jwtSecret === 'bidflow-dev-secret' || jwtSecret === 'change-me-in-production') {
      throw new Error('[BidFlow] JWT_SECRET must not use default development value in production.');
    }
  }

  if (process.env.NODE_ENV !== 'test') {
    console.log('[BidFlow] ✓ Environment validated');
  }
}

export function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`[BidFlow] Missing required env var: ${key}`);
  return value;
}
