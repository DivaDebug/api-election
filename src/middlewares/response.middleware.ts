import {Request, Response, NextFunction} from 'express';

const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.success = <T = unknown>(
    data: T | null = null,
    meta: Record<string, unknown> = {},
    statusCode: number = 200,
  ): Response => {
    return res.status(statusCode).json({
      meta: {
        errorCode: null,
        ...meta,
      },
      data,
    });
  };

  next();
};

export default responseMiddleware;
