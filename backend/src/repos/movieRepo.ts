import Movie from "../types/movie";

export default interface MovieRepo {

  findById: (id: number) => Promise<Movie>;
  findAll: () => Promise<Movie[]>;
  
  findByTitle?: (title: string) => Promise<Movie>;

  save: (movie: Movie) => Promise<void>;
}

