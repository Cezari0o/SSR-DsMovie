import argon2 from "argon2";
import UserRepo from "../../repos/userRepo";
import Callback from "../../types/callbackFn";
import User from "../../types/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default class UserService {

  constructor(private userRepo: UserRepo) { }

  createUser = async (params: { name: string, email: string, password: string }, done: Callback<User>) => {
    const name1 = params.name;
    const email1 = params.email;
    const password = params.password;

    try {
      const passwordHash = await argon2.hash(password, { type: argon2.argon2i, timeCost: 5, secret: Buffer.from(process.env.PEPPER || '') });
      const { createdAt, email, id, name, updatedAt } = await this.userRepo.save({ name: name1, email: email1, password: passwordHash });

      done(null, { id, name, email, createdAt, updatedAt });
    } catch (err) {

      if (err instanceof PrismaClientKnownRequestError) {
        done(new Error('User email already exists!'));
      } else {
        done(err as Error, null);
      }
    }
  }

  findUser = async (params: { email?: string, id?: number }, done: Callback<User>) => {

    try {

      const { id, email } = params;

      if (!id && !email) {
        throw new Error('Needs at least one parameter to find user, none was provided!');
      }

      let user, key;
      if (email) {
        user = await this.userRepo.findByEmail(email);
        key = 'email';
      } else {
        user = await this.userRepo.findById(id as number);
        key = 'id';
      }

      if (!user) {
        throw new Error(`No user with the given ${key}!`);
      }

      done(null, user);
    } catch (err) {
      done(err as Error, null);
    }

  }
}