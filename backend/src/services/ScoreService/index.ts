import MovieRepo from "../../repos/movieRepo";
import ScoreRepo from "../../repos/scoreRepo";
import UserRepo from "../../repos/userRepo";
import Callback from "../../types/callbackFn";
import Score from "../../types/score";

export default class ScoreService {

  constructor(
    private scoreRepo: ScoreRepo,
    private userRepo: UserRepo,
    private movieRepo: MovieRepo) { }

  async saveScore(score: { count: number, movieId: number, userId: number}, done: Callback<Score>) {
    try {
      await this.movieRepo.findById(score.movieId);
      await this.userRepo.findById(score.userId);

      const savedScore = await this.scoreRepo.save(score);

      done(null, savedScore);
    } catch (err) {
      done(err as Error, null);
    }
  }
}