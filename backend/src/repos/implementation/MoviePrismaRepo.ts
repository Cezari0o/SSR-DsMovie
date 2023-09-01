import MovieRepo, { MovieParams } from "../movieRepo";
import Movie from "../../types/movie";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

export default class MoviePrismaRepository implements MovieRepo {

  findById = async (id: number) => {
    const movie = await prisma.movie.findUniqueOrThrow({
      where: {
        id: id
      }
    });

    return movie;
  }

  findAll = async (params?: MovieParams) => {

    const { title } = params ? params : { title: undefined };
    const movies = await prisma.movie.findMany({
      where: {
        title: { mode: "insensitive", contains: title }
      },
      orderBy: {
        title: 'asc'
      }
    })

    return movies;
  };

  save = async (item: Movie) => {

    await prisma.movie.create({
      data: item,
    });
  };
}