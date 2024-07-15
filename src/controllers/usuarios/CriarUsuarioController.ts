import { Request, Response } from "express"; // Importa as classes Request e Response do Express
import { CriarUsuarioServico } from "../../services/usuarios/CriarUsuarioSevico"; // Importa o serviço para criar usuário

// Define a classe CriarUsuarioController
class CriarUsuarioController {
    // Define o método handle que lida com requisições HTTP
    async handle(req: Request, res: Response) {
        // Extrai login e senha do corpo da requisição
        const { login, senha } = req.body;

        // Cria uma instância do serviço CriarUsuarioServico
        const criarUsuarioSevico = new CriarUsuarioServico();

        // Executa o serviço para criar um usuário, passando login e senha
        const usuario = await criarUsuarioSevico.execute({
            login,
            senha
        });

        // Retorna a resposta JSON com os dados do usuário criado
        return res.json(usuario);
    }
}

// Exporta o controlador para que possa ser usado em outras partes da aplicação
export { CriarUsuarioController };
