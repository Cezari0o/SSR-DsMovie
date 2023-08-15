import { Request, } from "express";

export async function teste(req: Request, done: (ans: any) => void) {
  setTimeout(() => {
    done('Rodando!');
  }, 1500);
}