import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // Importa o módulo express-async-errors para lidar com erros assíncronos
import cors from 'cors'; // Importa o módulo cors para habilitar CORS (Cross-Origin Resource Sharing)
import { router } from './routes/routes'; // Importa as rotas da aplicação

// Cria uma instância do aplicativo Express
const app = express();

// Configura o Express para usar JSON como formato de dados
app.use(express.json());

// Configura o Express para permitir solicitações de diferentes origens (CORS)
app.use(cors());

// Usa o roteador importado para lidar com as rotas da aplicação
app.use(router);

// Middleware para lidar com erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // Verifica se o erro é uma instância do tipo Error
    if (err instanceof Error) {
        // Retorna um erro 400 (Bad Request) com a mensagem do erro
        return res.status(400).json({
            error: err.message
        });
    }

    // Retorna um erro 500 (Internal Server Error) para erros não tratados
    return res.status(500).json({
        status: 'error',
        message: 'Erro interno no Servidor'
    });
});

// Configura o servidor para escutar na porta 5000
app.listen(5000, () => {
    console.log('SERVER RODANDO!!!!');
});
