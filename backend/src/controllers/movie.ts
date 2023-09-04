import express, { query } from "express"
import { StatusCodes } from 'http-status-codes';
import MovieService from "../services/MovieService";
import MoviePrismaRepository from "../repos/implementation/MoviePrismaRepo";
import { checkSchema, matchedData, param, validationResult } from "express-validator";
import validationMiddleware from "../util/validationMiddleware";
import ScoreService from "../services/ScoreService";
import ScorePrismaRepository from "../repos/implementation/ScorePrismaRepo";
import UserPrismaRepository from "../repos/implementation/UserPrismaRepo";

const movies = express.Router();
const service = new MovieService(new MoviePrismaRepository);
const scoreService = new ScoreService(new ScorePrismaRepository, new UserPrismaRepository, new MoviePrismaRepository);

movies.get('/:id',
  param('id').isInt(),
  validationMiddleware(),
  (req, res) => {
    const { id } = matchedData(req);
    const convertedId = Number(id);

    service.findMovie(convertedId, (err, movie) => {

      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: `Error while retrieving movie info! ${err.message}` });
        return;
      }

      res.status(StatusCodes.OK).json(movie);
    });

  });

movies.get('/',
  checkSchema({
    size: {
      isInt: true,
      optional: true,
    },
    page: {
      isInt: true,
      optional: true,
    },
    sort: {
      isBoolean: false,
      escape: true,
      optional: true,
    },
    search: {
      isString: true,
      escape: true,
      optional: true,
    }
  }, ['query']),
  validationMiddleware(),
  (req: express.Request, res: express.Response) => {

    const { size, page, sort, search } = matchedData(req);

    service.findAllMovies({ size, page, search, sort }, (err, page) => {

      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: `Not possible to get movies! ${err.message}` });
        return;
      }

      res.status(StatusCodes.OK).json(page);
    })
  })

movies.get('/:id/scores',
  checkSchema({
    id: {
      isInt: true,
      escape: true,
    },
    size: {
      isInt: true,
      optional: true,
      checkRange: {
        custom: async (size: number) => {
          const value = Number(size);
          if (value < 1) throw new Error();
        },
        errorMessage: 'Size value must be > 0'
      }
    },
    page: {
      isInt: true,
      optional: true,
      checkRange: {
        custom: async (page: number) => {
          const value = Number(page);
          if (value < 1) throw new Error();
        },
        errorMessage: (val: number) => `Page must be positive, got ${val} instead`,
      }

    }
  }, ['params', 'query']),
  validationMiddleware(),
  (req: express.Request, res: express.Response) => {

    const { id, page, size } = matchedData(req);

    scoreService.findAllByMovie({
      id: Number(id),
      page: page ? Number(page) : undefined,
      size: size ? Number(size) : undefined
    }, (err, page) => {

      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: err.message });
        return;
      }

      res.json(page);
    })

  });


export default movies;