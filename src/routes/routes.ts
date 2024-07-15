import { Router, Request, Response } from "express"; // Importa as classes Router, Request e Response do Express

import { CriarUsuarioController } from "../controllers/usuarios/CriarUsuarioController"; // Importa o controlador para criação de usuário
import { AutenticaUsuarioController } from "../controllers/usuarios/AutenticaUsuarioController"; // Importa o controlador para autenticação de usuário

const router = Router(); // Cria uma instância do roteador do Express

// Define as rotas para a API

// Rota para salvar um novo usuário
router.post('/usuario', new CriarUsuarioController().handle);
// Usa o método POST para a URL '/usuario'. O controlador CriarUsuarioController lida com a solicitação.


// Rota para autenticar um usuário
router.post('/login', new AutenticaUsuarioController().handle);
// Usa o método POST para a URL '/login'. O controlador AutenticaUsuarioController lida com a solicitação.

 /*
 // Exemplo de rota GET comentada
 router.get('/', (req: Request, res: Response) => {
    return res.json({ ok: true }); 
    // Responde com um objeto JSON contendo { ok: true } para uma solicitação GET na URL '/'.
    // A linha abaixo está comentada, mas se fosse usada, lançaria um erro.
    // throw new Error('ERRO ao fazer req');
})
*/

export { router }; // Exporta o roteador para ser usado em outros arquivos, como no arquivo principal do servidor
