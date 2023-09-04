import argon2 from "argon2";
import Callback from "../../types/callbackFn";
import UserRepo from "../../repos/userRepo";

export default class AuthService {

  constructor(private userRepo: UserRepo) { }

  async checkUser(body: { email: string, password: string, }, done: Callback<string>) {

    try {
      const user = await this.userRepo.findByEmail(body.email);

      if (!user) {
        throw new Error('User not found!');
      }

      const passwordMatch = await argon2.verify(user.passwordHash || '', body.password, { secret: Buffer.from(process.env.PEPPER || ''), })

      if(!passwordMatch) {
        throw new Error('No user was found with the guiven data!');
      }

      done(null, 'someHash');

    } catch (err) {

      if (err instanceof Error) {
        done(err);
        return;
      }
      done(new Error('Verify user gone wrong! Unknown error!'));
    }

  }
}