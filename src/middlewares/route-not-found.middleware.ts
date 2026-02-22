import {Request, Response, NextFunction} from 'express';
import {NotFoundException} from '../exceptions/not-found.exception.js';

const routeNotFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new NotFoundException(`Route ${req.originalUrl} not found`));
};

export default routeNotFoundMiddleware;
