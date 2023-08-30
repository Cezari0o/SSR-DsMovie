import express, { Application } from 'express';
import dotenv from 'dotenv';
import { teste } from "./src/teste/controller";
import router from './src/routes';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(cors({

}));

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`)
});