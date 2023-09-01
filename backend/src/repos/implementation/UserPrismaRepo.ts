import UserRepo from "../userRepo";
import prisma from "../prisma";
import User from "../../types/user";

export default class UserPrismaRepository implements UserRepo {

  private static exclude = function (
    user: User,
    keys: string[]
  ): Omit<User, 'password'> {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    ) as User;
  }

  findById = async (id: number) => {
    return prisma.user.findFirst({ where: { id: id } });
  }

  findByEmail = async (email: string) => {
    return prisma.user.findFirst({ where: { email: { equals: email } } });
  }

  save = async (user: { name: string; email: string; password: string; }) => {
    const newUser = await prisma.user.create({
      data: {
        ...user
      },
    });

    return UserPrismaRepository.exclude(newUser, ['password']);
  };
}