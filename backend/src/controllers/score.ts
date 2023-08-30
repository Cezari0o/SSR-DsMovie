import express from 'express';
import ScoreService from '../services/ScoreService';
import Score from '../types/score';
import { StatusCodes } from 'http-status-codes';
import ScorePrismaRepo from '../repos/implementation/ScorePrismaRepo';
import UserPrismaRepo from '../repos/implementation/UserPrismaRepo';
import MoviePrismaRepository from '../repos/implementation/MoviePrismaRepo';

const score = express.Router();
const service = new ScoreService(new ScorePrismaRepo, new UserPrismaRepo, new MoviePrismaRepository);

score.put('/', (req, res) => {

  const { movieId, userId, count, } = req.body;

  service.saveScore({ movieId: movieId, userId: userId, count: count } as Score, (err, data) => {

    if (err) {
      res.json({ error: true, message: `Error while saving score! ${err.message}` });
      return;
    }

    res.status(StatusCodes.CREATED).json(data);
  });
})

export default score;