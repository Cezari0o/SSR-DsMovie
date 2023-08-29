import MovieRepo from "../movieRepo";
import Movie from "../../types/movie";
import prisma from "../prisma";

export default class MoviePrismaRepository implements MovieRepo {

  findById = async (id: number) => {
    const movie = await prisma.movie.findUniqueOrThrow({
      where: {
        id: id
      }
    });

    return movie;
  }

  findAll = async () => {
    const movies = await prisma.movie.findMany();
    
    return movies;
  };

  save = async (item: Movie) => {

    await prisma.movie.create({
      data: item,
    });
  };
}