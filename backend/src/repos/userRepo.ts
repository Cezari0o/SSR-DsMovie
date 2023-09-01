import User from "../types/user";

export default interface UserRepo {

  findById: (id: number) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;

  save: (user: { name: string, email: string, password: string }) => Promise<User>;
}