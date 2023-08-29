import Score from "../types/score";

export default interface ScoreRepo {
  findById: (id: number) => Promise<Score>;
  findAll: () => Promise<Score[]>;
  save: (score: Score) => Promise<void>;

  findAllByMovieId?: (movieId: number) => Promise<Score[]>;  
  findAllByUserId?: (userId: number) => Promise<Score[]>;
}