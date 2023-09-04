import Score from "../../types/score";
import prisma from "../prisma";
import ScoreRepo from "../scoreRepo";

export default class ScorePrismaRepository implements ScoreRepo {

  save = async (score: Score) => {
    return await prisma.score.create({ data: score, });
  }

  findAll = async () => {
    return prisma.score.findMany();
  }

  findById = async (id: number) => {
    return prisma.score.findFirstOrThrow({ where: { id: id } })
  }

  findAllByMovieId = async (movieId: number) => {

    return prisma.score.findMany({ where: { movieId: movieId } });
  };
}