import MovieRepo from "../../repos/movieRepo";
import Callback from "../../types/callbackFn";
import Movie from "../../types/movie";
import MoviePage from "../../types/moviePage";
import PageParams from "../../types/pageParams";

export default class MovieService {

  constructor(private MovieRepo: MovieRepo) { }

  findMovie(id: number, done: Callback<Movie>) {

    this.MovieRepo.findById(id).then(movie => {
      done(null, movie);
    }).catch(err => {
      done(err, null);
    });
  }

  findAllMovies(params: undefined | null | PageParams, done: Callback<MoviePage>) {

    let pageInfo: PageParams = { page: 1, size: 12 };

    if (params) {
      pageInfo = {
        page: params.page ? Number(params.page) : 1,
        size: params.size ? Number(params.size) : 12,
        sort: params.sort,
        search: params.search,
      };
    }

    this.MovieRepo.findAll({ title: pageInfo.search })
      .then(movies => {

        const { page, size } = pageInfo;
        const totalPages = Math.ceil(movies.length / size);

        const toReturn: MoviePage = {
          content: movies.slice((page - 1) * size, page * size),
          empty: movies.length === 0,
          first: page === 1,
          last: page === totalPages,
          number: page,
          numberOfElements: movies.length,
          size: size,
          totalElements: movies.length,
          totalPages: totalPages,
        };

        done(null, toReturn);
      })
      .catch(err => {
        done(err, null);
      })

  }
}