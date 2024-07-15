import { Request, Response } from "express"; // Importa as classes Request e Response do Express
import { AutenticaUsuarioServico } from '../../services/usuarios/AutenticaUsuarioServico'; // Importa o serviço para autenticação de usuário

// Define a classe AutenticaUsuarioController
class AutenticaUsuarioController {
    // Define o método handle que lida com requisições HTTP
    async handle(req: Request, res: Response) {
        // Extrai login e senha do corpo da requisição
        const { login, senha } = req.body;

        // Cria uma instância do serviço AutenticaUsuarioServico
        const autenticaUsuarioServico = new AutenticaUsuarioServico();

        // Executa o serviço para autenticar o usuário, passando login e senha
        const autentica = await autenticaUsuarioServico.execute({
            login,
            senha
        });

        // Retorna a resposta JSON com os dados da autenticação
        return res.json(autentica);
    }
}

// Exporta o controlador para que possa ser usado em outras partes da aplicação
export { AutenticaUsuarioController };
