import { ApiError } from './api.error';
import { ErrorHandlerFunction } from '../error.handler.strategies';

export const defaultApiErrorHandler: ErrorHandlerFunction<ApiError> = (
  error: unknown,
) => {
  return ApiError.ofInternalServerError(undefined, error);
};
