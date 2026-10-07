import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.MYSQLDB_HOST,
  port: Number(process.env.MYSQLDB_PORT),
  user: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
})

const prisma = new PrismaClient({
    adapter,
})

export default prisma;
