import express from 'express';
import { StatusCodes } from 'http-status-codes';
import movies from './controllers/movie';
import scores from './controllers/score';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(StatusCodes.OK).send(`DSMovie API v${process.env.npm_package_version}`)
});

router.use('/movies', movies);
router.use('/scores', scores);

export default router;