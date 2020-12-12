import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import AppError from './errors/AppError';
import routes from './routes/index.routes';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3333',
  optionSucessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  response.header('Acces-Control-Allow-Origin', 'http:localhost:3000');

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
