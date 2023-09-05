import express from 'express';
import ScoreService from '../services/ScoreService';
import Score from '../types/score';
import { StatusCodes } from 'http-status-codes';
import ScorePrismaRepo from '../repos/implementation/ScorePrismaRepo';
import UserPrismaRepo from '../repos/implementation/UserPrismaRepo';
import MoviePrismaRepository from '../repos/implementation/MoviePrismaRepo';
import { checkSchema, matchedData } from 'express-validator';
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
  async (req: express.Request, res: express.Response) => {

    const { email, movieId, score } = matchedData(req);

    userService.findUser({ email, }, async (err, user) => {

      if (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: true, message: err.message });
        return;
      }

      if (!user) {
        let name = String(email).match(/(.*@)/)?.[0];
        name = name?.slice(0, name.length - 1) as string;

        let terminateFunction = false;
        await userService.createUser({ name: name, email: email, password: '' }, (err, newUser) => {

          if (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: `Score save failed! Reason: ${err.message}` });
            terminateFunction = true;
            return;
          }
          user = newUser;
        });

        if (terminateFunction) {
          return;
        }
      }

      await scoreService.saveScore({ count: Number(score), movieId: Number(movieId), userId: Number(user?.id as number) }, (err, data) => {

        if (err) {
          res.status(StatusCodes.BAD_REQUEST).json({ error: true, message: `Error while saving score! ${err.message}` });
          return;
        }

        res.status(StatusCodes.CREATED).json(data);
      });
    })

  })

export default score;