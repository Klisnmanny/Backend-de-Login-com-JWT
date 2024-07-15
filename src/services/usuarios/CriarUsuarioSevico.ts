import prismaClient from "../../prisma"; // Importa a instância do Prisma Client para interagir com o banco de dados
import { hash } from "bcryptjs"; // Importa a função hash para criar um hash da senha

// Define a interface para o formato de entrada do serviço
interface UsuarioRequest {
    login: string; // Nome de login do usuário
    senha: string; // Senha do usuário
}

// Define a classe CriarUsuarioServico
class CriarUsuarioServico {
    // Define o método execute que realiza a criação do usuário
    async execute({ login, senha }: UsuarioRequest) {
        // Verifica se já existe um usuário com o mesmo login
        const loginExiste = await prismaClient.usuario.findFirst({
            where: {
                nome: login // Busca pelo nome do usuário
            }
        });

        // Se já existir um usuário com o mesmo login, lança um erro
        if (loginExiste) {
            throw new Error("Usuário já existe!"); // Mensagem de erro se o usuário já estiver cadastrado
        }

        // Cria um hash da senha usando o algoritmo bcrypt com um custo de 12
        const senhaHash = await hash(senha, 12);

        // Cria um novo usuário no banco de dados
        const usuario = await prismaClient.usuario.create({
            data: {
                nome: login, // Nome do usuário
                senha: senhaHash, // Senha criptografada
            },
            select: {
                id_usuario: true, // Seleciona o ID do usuário
                nome: true // Seleciona o nome do usuário
            }
        });

        // Retorna o usuário criado
        return usuario;
    }
}

// Exporta a classe CriarUsuarioServico para que possa ser utilizada em outras partes da aplicação
export { CriarUsuarioServico };
