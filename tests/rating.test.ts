import { beforeAll, afterAll, test, expect } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

let prisma: PrismaClient;
const dbPath = path.join(__dirname, 'test.sqlite');

beforeAll(() => {
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: `file:${dbPath}` },
    stdio: 'inherit',
  });
  prisma = new PrismaClient({ datasources: { db: { url: `file:${dbPath}` } } });
});

afterAll(async () => {
  await prisma.$disconnect();
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
});

test('rating upsert', async () => {
  const trackId = 't1';
  await prisma.rating.upsert({
    where: { trackId },
    update: { score: 50 },
    create: { trackId, score: 50 },
  });
  const r2 = await prisma.rating.upsert({
    where: { trackId },
    update: { score: 80 },
    create: { trackId, score: 80 },
  });
  expect(r2.score).toBe(80);
});
