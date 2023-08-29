import { Request } from "express";
import Callback from "../../types/callbackFn";
import Movie from "../../types/movie";
import MoviePage from "../../types/moviePage";

export function getMovieInfo(req: Request, done: Callback<Movie>) {

  const { id } = req.params;

  const movieTest: Movie = {
    id: Number(id),
    image: 'https://cdn.mobygames.com/covers/6198391-kingdom-hearts-ii-playstation-2-front-cover.jpg',
    title: 'Kingdom Hearts II'
  }

  setTimeout(() => {
    done(null, movieTest);
  }, 800);

}

export function getMovies(req: Request, done: Callback<MoviePage>) {

  const { size, page, sort } = req.query;

  done(null, {
    content: [],
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: size ? Number(size) : 12,
    number: 0,
    first: true,
    numberOfElements: 0,
    empty: true
  });

}