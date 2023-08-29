import express from "express"
import { StatusCodes } from 'http-status-codes';
import MovieService from "../services/MovieService";
import MoviePrismaRepository from "../repos/implementation/MoviePrismaRepo";

const movies = express.Router();
const service = new MovieService(new MoviePrismaRepository);

movies.get('/:id', (req, res) => {

  const { id } = req.params;
  const convertedId = Number(id);

  if (isNaN(convertedId) || convertedId <= 0) {
    res.json({ error: true, message: 'Invalid movie id!' });
    return;
  }

  service.findMovie(convertedId, (err, movie) => {

    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: `Error while retrieving movie info! ${err.message}` });
      return;
    }

    res.status(StatusCodes.OK).json(movie);
  });

});

movies.get('/', (req, res) => {

  // TODO: validar parametros  
  const { size, page, sort } = req.query;

  service.findAllMovies(null, (err, page) => {

    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: `Not possible to get movies! ${err.message}` });
      return;
    }

    res.status(StatusCodes.OK).json(page);
  })
})

export default movies;