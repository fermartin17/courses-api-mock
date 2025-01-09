import { EntityDoesNotExistError } from './common/entity.does.not.exist.error';
import { ApiError } from './domain/api.error';
import { HttpStatus } from '@nestjs/common';

export interface ErrorHandlerFunction<T> {
  (error?: any): T;
}

export type ErrorHandlerStrategies<T> = {
  [key: string]: ErrorHandlerFunction<T>;
};

export class ErrorHandler<T> {
  defaultStrategy: ErrorHandlerFunction<T>;
  errors: ErrorHandlerStrategies<T>;

  constructor(
    defaultStrategy: ErrorHandlerFunction<T>,
    errors?: ErrorHandlerStrategies<T>,
  ) {
    this.defaultStrategy = defaultStrategy;
    this.errors = errors ? errors : {};
  }

  addErrorHandler(
    key: string,
    errorHandler: ErrorHandlerFunction<T>,
  ): ErrorHandler<T> {
    this.errors[key] = errorHandler;
    return this;
  }

  handle(error: unknown): T {
    if (
      typeof error === 'object' &&
      error?.constructor?.name &&
      this.errors[error.constructor.name]
    ) {
      return this.errors[error.constructor.name](error);
    }
    return this.defaultStrategy(error);
  }
}

export class ApiErrorHandler extends ErrorHandler<ApiError> {
  constructor(
    defaultStrategy: ErrorHandlerFunction<ApiError>,
    errors?: ErrorHandlerStrategies<ApiError>,
  ) {
    super(defaultStrategy, errors);
    this.addDefaultErrorHandlers();
  }

  private addDefaultErrorHandlers() {
    this.addErrorHandler(
      EntityDoesNotExistError.name,
      () =>
        new ApiError('Entity not found', HttpStatus.NOT_FOUND, 'Not found.'),
    );
  }
}
