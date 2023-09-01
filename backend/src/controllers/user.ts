import express from "express"
import validationMiddleware from "../util/validationMiddleware";
import { checkSchema, matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";
import UserService from "../services/UserService";
import UserPrismaRepository from "../repos/implementation/UserPrismaRepo";

const user = express.Router();
const service = new UserService(new UserPrismaRepository);

user.post('/',
  checkSchema({
    name: {
      isString: true,
    },
    email: {
      isEmail: true,
    },
    password: {
      isStrongPassword: true,
    },
  }, ['body']),
  validationMiddleware(),
  (req: express.Request, res: express.Response) => {

    const { name, email, password } = matchedData(req);

    service.createUser({ name, email, password }, (err, newUser) => {

      if (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: `Error while creating user, ${err.message}` });
        return;
      }

      res.status(StatusCodes.CREATED).json(newUser);
    })
  });

export default user;