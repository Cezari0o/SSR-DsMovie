import express, { query } from "express"
import { StatusCodes } from 'http-status-codes';
import MovieService from "../services/MovieService";
import MoviePrismaRepository from "../repos/implementation/MoviePrismaRepo";
import { checkSchema, matchedData, param, validationResult } from "express-validator";
import validationMiddleware from "../util/validationMiddleware";

const movies = express.Router();
const service = new MovieService(new MoviePrismaRepository);

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
    }
  }, ['query']),
  validationMiddleware(),
  (req: express.Request, res: express.Response) => {

    service.findAllMovies({ ...matchedData(req) }, (err, page) => {

      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: `Not possible to get movies! ${err.message}` });
        return;
      }

      res.status(StatusCodes.OK).json(page);
    })
  })

export default movies;