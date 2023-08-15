import Movie from "./movie";

interface MoviePage {
  content: Array<Movie>,
  last: boolean,
  totalPages: number,
  totalElements: number,
  /**
   * Tamanho da pagina
   */
  size: number,
  number: number,
  first: boolean,
  numberOfElements: number,
  /**
   * Se `true`, a pagina esta vazia
   */
  empty: boolean
}

export default MoviePage;