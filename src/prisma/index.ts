import { PrismaClient } from "@prisma/client"; // Importa a classe PrismaClient do pacote @prisma/client

// Cria uma nova instância do PrismaClient
const prismaClient = new PrismaClient();

// Exporta a instância do PrismaClient para que possa ser utilizada em outras partes da aplicação
export default prismaClient;
