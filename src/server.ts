import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import './database';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
