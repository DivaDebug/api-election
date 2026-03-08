declare global {
  namespace Express {
    interface Request {
      validated?: {
        params?: unknown;
        query?: unknown;
        body?: unknown;
      };
    }

    interface Response {
      success<T = unknown>(
        data?: T | null,
        meta?: Record<string, unknown>,
        statusCode?: number,
      ): this;
    }
  }
}

export {};
