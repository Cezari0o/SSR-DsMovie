import User from "../types/user";

export default interface UserRepo {

  findById: (id: number) => Promise<User>;
}