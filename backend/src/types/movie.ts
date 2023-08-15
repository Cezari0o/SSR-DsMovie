interface Movie {
  id: number;
  title: string;
  score: number;
  /**
   * Quantidade de Avaliacoes
   */
  count: number;
  /**
   * URL da thumb do filme
   */
  image: string;
}

export default Movie;