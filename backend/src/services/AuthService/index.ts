import argon2 from "argon2";
import Callback from "../../types/callbackFn";
import UserRepo from "../../repos/userRepo";
import { sign } from "jsonwebtoken";
import { Token } from "typescript";
import { readFileSync } from "fs";
import readServerKey from "../../util/readKey";

export default class AuthService {

  constructor(private userRepo: UserRepo) { }

  /**
   * Verifica se um dado usuario esta correto. Retorna um token assinado se for o caso.
   * @param body 
   * @param done 
   * @returns 
   */
  async checkUser(body: { email: string, password: string, }, done: Callback<token>) {

    try {
      const user = await this.userRepo.findByEmail(body.email);

      if (!user) {
        throw new Error('No user was found with the guiven data!');
      }

      const passwordMatch = await argon2.verify(user.passwordHash || '', body.password, { secret: Buffer.from(process.env.PEPPER || ''), })

      if (!passwordMatch) {
        throw new Error('No user was found with the guiven data!');
      }

      const userToken = sign({ id: user.id, }, readServerKey(), { algorithm: "RS512", expiresIn: '30m', });

      done(null, userToken);
    } catch (err) {

      if (err instanceof Error) {
        done(err);
        return;
      }
      done(new Error('Verify user gone wrong! Unknown error!'));
    }

  }
}