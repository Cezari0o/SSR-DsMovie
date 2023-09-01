import MovieRepo, { MovieParams } from "../movieRepo";
import Movie from "../../types/movie";
import prisma from "../prisma";
import Score from "../../types/score";

export default class MoviePrismaRepository implements MovieRepo {

  private sumScores(scores: Score[]): { score: number, count: number } {
    const score = scores.reduce((prev, current) => {
      return current.count / scores.length + prev;
    }, 0);

    return { score: score, count: scores.length };
  }

  findById = async (id: number) => {
    const movie = await prisma.movie.findUniqueOrThrow({
      where: {
        id: id
      },
      include: {
        scores: true,
      }
    });

    const toReturn = { ...movie, scores: undefined, ...this.sumScores(movie.scores) };
    return toReturn;
  }

  findAll = async (params?: MovieParams) => {

    const { title } = params ? params : { title: undefined };
    const movies = await prisma.movie.findMany({
      where: {
        title: { mode: "insensitive", contains: title }
      },

      include: {
        scores: true,
      },
      orderBy: {
        title: 'asc'
      }
    });

    const toReturn = movies.map(m => {
      return { ...m, ...this.sumScores(m.scores), scores: undefined };
    })

    return toReturn;
  };

  save = async (item: Movie) => {

    await prisma.movie.create({
      data: item,
    });
  };
}