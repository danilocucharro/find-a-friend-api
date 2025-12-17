import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "src/env/index.js";

const databaseUrl = process.env.DATABASE_URL || env.DATABASE_URL;

const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
console.log("PRISMA ESTA CONECTADO EM => ", databaseUrl);
export const prisma = new PrismaClient({ adapter });
