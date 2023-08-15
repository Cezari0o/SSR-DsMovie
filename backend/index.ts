import express, { Application } from 'express';
import dotenv from 'dotenv';
import { teste } from "./src/teste/controller";


dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`Olá mundo!`);
});

app.get('/teste', (req, res) => {

  try {
    const pronto = (msg: string) => res.send(msg);

    teste(req, pronto);
  } catch (error) {

    res.send(`deu ruim!`);
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`)
});