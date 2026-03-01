import {Request, Response, NextFunction} from 'express';
import {HttpException} from '../exceptions/http.exception.js';

interface StackFrame {
  functionName: string;
  fileName: string;
  line: number;
  column: number;
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
) => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (exception instanceof HttpException) {
    statusCode = exception.statusCode;
    message = exception.message;
  }

  // 開發模式顯示 stack
  if (process.env.NODE_ENV === 'development') {
    console.error(exception);

    message = exception instanceof Error ? exception.message : message;

    const stack = exception instanceof Error
      ? parseStackTrace(exception.stack)
      : undefined;

    return res.status(statusCode).json({
      success: false,
      error: {
        message,
        stack,
      },
    });
  }

  return res.status(statusCode).json({
    success: false,
    error: {
      message,
    },
  });
};

export default exceptionHandlerMiddleware;
