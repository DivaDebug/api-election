import {Request, Response, NextFunction} from 'express';
import {HttpException} from '../exceptions/http.exception.js';

interface StackFrame {
  functionName: string;
  fileName: string;
  line: number;
  column: number;
}

interface ErrorResponse {
  meta: {
    errorCode: string;
  };
  error: {
    message: string;
    stack?: StackFrame[];
  };
}

const parseStackTrace = (stackString: string | undefined): StackFrame[] => {
  if (!stackString) {
    return [];
  }

  const lines = stackString.split('\n').slice(1);

  return lines
    .map(line => {
      const match = line.match(/at\s+(?<functionName>.+?)\s+\((?<fileName>.+?):(?<lineStr>\d+):(?<columnStr>\d+)\)/);

      if (!match) {
        return null;
      }

      return {
        functionName: match.groups?.functionName?.trim() ?? '',
        fileName: match.groups?.fileName ?? '',
        line: parseInt(match.groups?.lineStr || '', 10),
        column: parseInt(match.groups?.columnStr || '', 10),
      };
    })
    .filter((frame) => frame !== null);
};

const exceptionHandlerMiddleware = (
  exception: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  let statusCode = 500;

  const response: ErrorResponse = {
    meta: {
      errorCode: 'INTERNAL_SERVER_ERROR',
    },
    error: {
      message: 'Internal server error',
    },
  };

  if (exception instanceof HttpException) {
    statusCode = exception.statusCode;
    response.error.message = exception.message;
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(exception);

    if (exception instanceof Error) {
      response.error.message = exception.message;
      response.error.stack = parseStackTrace(exception.stack);
    }
  }

  return res.status(statusCode).json(response);
};

export default exceptionHandlerMiddleware;
