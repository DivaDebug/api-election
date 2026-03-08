import {Request, Response, NextFunction} from 'express';
import {ZodObject} from 'zod';

const validate = (schemas: ZodObject) => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  req.validated = await schemas.parseAsync({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  next();
};

export default validate;
