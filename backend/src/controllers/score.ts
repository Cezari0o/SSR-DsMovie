import express from 'express';
import ScoreService from '../services/ScoreService';
import Score from '../types/score';
import { StatusCodes } from 'http-status-codes';
import ScorePrismaRepo from '../repos/implementation/ScorePrismaRepo';
import UserPrismaRepo from '../repos/implementation/UserPrismaRepo';
import MoviePrismaRepository from '../repos/implementation/MoviePrismaRepo';
import { checkSchema } from 'express-validator';
import validationMiddleware from '../util/validationMiddleware';
import UserService from '../services/UserService';

const score = express.Router();
const scoreService = new ScoreService(new ScorePrismaRepo, new UserPrismaRepo, new MoviePrismaRepository);
const userService = new UserService(new UserPrismaRepo);

score.put('/',
  checkSchema({
    email: {
      isEmail: true,
    },
    movieId: {
      isInt: true,
      escape: true,
    },
    score: {
      isNumeric: true,
    }
  }),
  validationMiddleware(),
  (req: express.Request, res: express.Response) => {

    const { email, movieId, score } = req.body;

    userService.findUser({ email, }, (err, user) => {

      if (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: true, message: err.message });
        return;
      }

      scoreService.saveScore({ count: Number(score), movieId: Number(movieId), userId: Number(user?.id as number) }, (err, data) => {

        if (err) {
          res.status(StatusCodes.BAD_REQUEST).json({ error: true, message: `Error while saving score! ${err.message}` });
          return;
        }

        res.status(StatusCodes.CREATED).json(data);
      });


    })

  })

export default score;