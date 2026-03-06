import {Request, Response, NextFunction} from 'express';
import {ZodType} from 'zod';
import {ParamsDictionary, Query} from 'express-serve-static-core';

interface ValidationSchemas {
  params?: ZodType<ParamsDictionary>;
  query?: ZodType<Query>;
  body?: ZodType<unknown>;
}

const validate = (schemas: ValidationSchemas) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (schemas.params) {
    req.params = schemas.params.parse(req.params);
  }

  if (schemas.query) {
    req.query = schemas.query.parse(req.query);
  }

  if (schemas.body) {
    req.body = schemas.body.parse(req.body);
  }

  next();
};

export default validate;
