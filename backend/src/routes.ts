import express from 'express';
import { StatusCodes } from 'http-status-codes';
import movies from './controllers/movie';
import scores from './controllers/score';
import user from './controllers/user';
import auth from './controllers/auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(StatusCodes.OK).send(`DSMovie API v${process.env.npm_package_version}`)
});

router.get('/badge-status', (req, res) => {
  res.status(StatusCodes.OK).json({
    schemaVersion: 1,
    label: '',
    message: 'passing',
    color: 'success'
  });
});

router.use('/movies', movies);
router.use('/scores', scores);
// router.use('/user', user);
// router.use('/auth', auth);

router.use((req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({ error: true, message: 'Resource not found!' });
})

export default router;