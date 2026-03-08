import type {Request} from 'express';

interface ValidatedPayload {
  body?: unknown;
  query?: unknown;
  params?: unknown;
}

interface ValidatedRequest<T extends ValidatedPayload> extends Request {
  validated: T;
}

export default ValidatedRequest;
