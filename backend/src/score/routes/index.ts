import express from 'express';
import { saveScore } from '../controller';
import { StatusCodes } from 'http-status-codes';

const scores = express.Router();

scores.put('/', (req, res) => {

  saveScore(req, (err, data) => {

    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: `Save score failed, ${err.message}` });
      return;
    }

    res.json(data);
  })
});


export default scores;