import Score from "../types/score";

export default interface ScoreRepo {
  findById: (id: number) => Promise<Score>;

  findAll: (params?: { userId?: number, movieId?: number }) => Promise<Score[]>;
  findAllByMovieId: (movieId: number) => Promise<Score[]>;
  findAllByUserId?: (userId: number) => Promise<Score[]>;

  save: (score: Score) => Promise<Score>;
  update: (scoreId: number, score: Score) => Promise<Score>;
}