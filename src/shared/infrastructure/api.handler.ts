import {
  ApiErrorHandler,
  ErrorHandler,
} from '../errors/error.handler.strategies';
import { ApiError } from '../errors/domain/api.error';
import { defaultApiErrorHandler } from '../errors/domain/default.api.error.handler.strategy';

export abstract class ApiHandler {
  static readonly DEFAULT_PAGE: number = 0;
  static readonly DEFAULT_LIMIT: number = 20;
  protected readonly errorHandler: ErrorHandler<ApiError>;

  protected constructor() {
    this.errorHandler = this.buildErrorHandler();
  }

  protected buildErrorHandler(): ApiErrorHandler {
    return new ApiErrorHandler(defaultApiErrorHandler);
  }
}
