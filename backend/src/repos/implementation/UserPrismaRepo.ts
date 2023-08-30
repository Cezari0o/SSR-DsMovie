import UserRepo from "../userRepo";
import prisma from "../prisma";

export default class UserPrismaRepository implements UserRepo {

  findById = async (id: number) => {
    return prisma.user.findFirstOrThrow({ where: { id: id } });
  };
}