import { PrismaClient } from '@prisma/client/edge';
// import { MONGODB_URI } from '../config';

const prisma = new PrismaClient();

export default prisma;
