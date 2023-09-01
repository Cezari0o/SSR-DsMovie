interface Movie {
  id: number;
  title: string;
  /**
   * URL da thumb do filme
   */
  image: string;
  score: number;
  count: number;
}

export default Movie;