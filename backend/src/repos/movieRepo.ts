import Movie from "../types/movie";

export interface MovieParams {
  title?: string;
  // orderBy?: string;
}

export default interface MovieRepo {

  findById: (id: number) => Promise<Movie>;
  findAll: (params: MovieParams) => Promise<Movie[]>;

  findByTitle?: (title: string) => Promise<Movie>;

  save: (movie: Movie) => Promise<void>;
}

