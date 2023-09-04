import express from 'express';
import { checkSchema, matchedData } from 'express-validator';
import validationMiddleware from '../util/validationMiddleware';
import AuthService from '../services/AuthService';
import UserPrismaRepository from '../repos/implementation/UserPrismaRepo';
import { StatusCodes } from 'http-status-codes';

const auth = express.Router();
const authService = new AuthService(new UserPrismaRepository);

auth.post('/login',
  checkSchema({
    email: {
      isEmail: true,
      escape: true,
      errorMessage: 'Invalid email value!',
    },
    password: {
      isEmpty: false,
      isString: true,
      errorMessage: 'Password is required!',
    },
  }, ['body']),
  validationMiddleware(),
  (req: express.Request, res: express.Response) => {

    const { email, password } = matchedData(req);

    authService.checkUser({ email, password }, (err, jwtToken) => {

      if (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: true, message: err.message });
        return;
      }

      res.status(StatusCodes.OK).send(jwtToken);
    });

  });


export default auth;