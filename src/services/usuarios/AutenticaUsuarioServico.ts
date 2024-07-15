import prismaClient from "../../prisma"; // Importa a instância do Prisma Client para interagir com o banco de dados
import { compare } from "bcryptjs"; // Importa a função compare para comparar hashes de senhas
import { sign } from 'jsonwebtoken'; // Importa a função sign para gerar tokens JWT

// Define a interface para o formato de entrada do serviço
interface AutenticaResquest {
    login: string; // Login do usuário
    senha: string; // Senha do usuário
}

// Define a classe AutenticaUsuarioServico
class AutenticaUsuarioServico {
    // Define o método execute que realiza a autenticação
    async execute({ login, senha }: AutenticaResquest) {
        // Busca o usuário no banco de dados pelo nome
        const usuario = await prismaClient.usuario.findFirst({
            where: {
                nome: login, // Usa o nome do usuário para buscar no banco
            }
        });

        // Verifica se o usuário foi encontrado
        if (!usuario) {
            throw new Error("Login ou senha inválido"); // Se não encontrar, lança um erro
        }

        // Compara a senha fornecida com a senha armazenada no banco
        const senhaValida = await compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error("Login ou senha inválido"); // Se a senha não corresponder, lança um erro
        }

        // Gerar token para o usuário
        const token = sign(
            { login: usuario.nome }, // Payload do token, geralmente contém informações sobre o usuário
            process.env.JWT_SECRET || 'default_secret', // Chave secreta para assinar o token; usa uma chave padrão se a variável de ambiente não estiver definida
            {
                subject: usuario.id_usuario.toString(), // O subject deve ser uma string (ID do usuário)
                expiresIn: '1d', // Token expira em 1 dia
            }
        );

        // Retorna um objeto com os dados do usuário e o token gerado
        return {
            id: usuario.id_usuario,
            login: usuario.nome,
            token: token
        };
    }
}

// Exporta a classe AutenticaUsuarioServico para ser utilizada em outras partes da aplicação
export { AutenticaUsuarioServico };
