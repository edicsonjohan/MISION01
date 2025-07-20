import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Función para conectar a la base de datos
export const connect = async function () {
  await prisma.$connect();
  console.log("✅ Database connected");
};

// Función para desconectar si lo necesitas
export const disconnect = async function () {
  await prisma.$disconnect();
  console.log("⛔ Database disconnected");
};

export default prisma;
