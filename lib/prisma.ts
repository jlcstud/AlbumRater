import { PrismaClient } from '@prisma/client';
import path from 'path';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Resolve relative SQLite paths so the database file is found regardless of
// the process working directory. Prisma resolves paths relative to the schema
// file, which lives in the `prisma` directory.
const resolveUrl = (url: string | undefined) => {
  if (!url) return url;
  if (!url.startsWith('file:')) return url;
  const relative = url.replace(/^file:/, '');
  const schemaDir = path.join(process.cwd(), 'prisma');
  const absolute = path.resolve(schemaDir, relative);
  return `file:${absolute}`;
};

const datasourceUrl = resolveUrl(process.env.DATABASE_URL);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: { db: { url: datasourceUrl } },
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
