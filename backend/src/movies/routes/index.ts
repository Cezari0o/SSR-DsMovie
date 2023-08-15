import express from "express"
import { getMovieInfo, getMovies } from "../controller";
import { StatusCodes } from 'http-status-codes';

const movies = express.Router();

movies.get('/:id', (req, res) => {

  getMovieInfo(req, (err, movie) => {

    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: `Error while retrieving movie info! ${err.message}` });
      return;
    }

    res.status(StatusCodes.OK).json(movie);
  });

});

movies.get('/', (req, res) => {

  getMovies(req, (err, page) => {

    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: `Not possible to get movies! ${err.message}` });
      return;
    }

    res.status(StatusCodes.OK).json(page);
  })
})

export default movies;