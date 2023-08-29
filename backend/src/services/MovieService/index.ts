import MovieRepo from "../../repos/movieRepo";
import Callback from "../../types/callbackFn";
import Movie from "../../types/movie";
import MoviePage from "../../types/moviePage";

export default class MovieService {

  constructor(private MovieRepo: MovieRepo) { }

  findMovie(id: number, done: Callback<Movie>) {

    this.MovieRepo.findById(id).then(movie => {
      done(null, movie);
    }).catch(err => {
      done(err, null);
    });
  }

  findAllMovies(params: { title?: string, } | undefined | null, done: Callback<MoviePage>) {

    this.MovieRepo.findAll()
    .then(movies => {
      // TODO: ajustar pagina
      const page: MoviePage = {
        content: movies,
        empty: movies.length === 0,
        first: false, // ajustar
        last: false, // ajustar
        number: 0, // ajustar
        numberOfElements: movies.length,
        size: movies.length, // ajustar
        totalElements: movies.length, // ajustar
        totalPages: movies.length, // ajustar
      };

      done(null, page);
    })
    .catch(err => {
      done(err, null);
    })

  }
}