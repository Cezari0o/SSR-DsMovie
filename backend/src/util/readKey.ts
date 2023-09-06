import { readFileSync } from "fs";

/**
 * Funcao utilitaria para ler a chave do servidor. Usada para assinar jwts.
 * @returns Chave armazenada
 */
export default function readServerKey() {

  const privateKey = readFileSync('privatekey.pem', { encoding: 'utf-8' });

  return privateKey;
}