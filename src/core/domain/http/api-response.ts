import type { HttpResponse } from './http-response';

interface OkParams {
  payload?: object;
  message?: string;
  headers?: object;
  metadata?: object;
}
export function ok({
  payload,
  message,
  headers,
  metadata,
}: OkParams): HttpResponse {
  return {
    statusCode: 200,
    success: true,
    payload: payload,
    message: message ?? 'Request successfull',
    errors: [],
    metadata,
    headers,
  };
}

interface BadRequest {
  errors: any;
  headers?: any;
}

export function badRequest({ errors, headers }: BadRequest): HttpResponse {
  return {
    statusCode: 400,
    success: false,
    payload: {},
    message: 'Invalid request params',
    metadata: {},
    errors,
    headers,
  };
}

export function notFound({ errors, headers }: BadRequest) {
  return {
    statusCode: 404,
    errors,
    headers,
  };
}

export function conflict({ errors, headers }: BadRequest) {
  return {
    statusCode: 409,
    errors,
    headers,
  };
}
