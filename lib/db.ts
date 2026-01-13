// import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaPg } from '@prisma/adapter-pg'

import dotenv from 'dotenv';
import { PrismaClient } from './generated/prisma/client';

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`;

// const adapter = new PrismaNeon({ connectionString });

const adapter = new PrismaPg({ connectionString })
export const prisma = new PrismaClient({ adapter });