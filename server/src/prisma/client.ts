import { PrismaClient } from '@prisma/client';
import { MONGODB_URI } from '../config';

const prisma = new PrismaClient({
  datasources: { db: { url: MONGODB_URI } },
});

export default prisma;
