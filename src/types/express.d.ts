declare namespace Express {
  interface Response {
    success<T = unknown>(
      data?: T | null,
      meta?: Record<string, unknown>,
      statusCode?: number,
    ): Response;
  }
}
