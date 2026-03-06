import {Request, Response, NextFunction} from 'express';
import {HttpException} from '../exceptions/http.exception.js';
import {ZodError} from 'zod';

interface StackFrame {
  functionName: string;
  fileName: string;
  line: number;
  column: number;
}

interface ValidationError {
  field: string;
  message: string;
}

interface ErrorResponse {
  meta: {
    errorCode: string;
  };
  error: {
    message: string;
    errors?: ValidationError[];
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
  } else if (exception instanceof ZodError) {
    statusCode = 400;
    response.meta.errorCode = 'VALIDATION_ERROR';
    response.error.message = 'Validation failed';
    response.error.errors = exception.issues.map((issue) => {
      return {
        field: issue.path.join('.'),
        message: issue.message,
      };
    });
  } else if (exception instanceof Error) {
    response.error.message = exception.message;
  }

  if (
    exception instanceof Error
    && process.env.NODE_ENV === 'development'
  ) {
    response.error.stack = parseStackTrace(exception.stack);
  }

  return res.status(statusCode).json(response);
};

export default exceptionHandlerMiddleware;
