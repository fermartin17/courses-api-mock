import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
  _error?: string;
  _errorMessage: string | string[];
  _statusCode: number;
  _errorCause: unknown;

  constructor(
    errorMessage: string | string[],
    statusCode: number,
    error?: string,
    errorCause?: unknown,
  ) {
    super(
      HttpException.createBody({
        error: error,
        message: errorMessage,
        statusCode: statusCode,
      }),
      statusCode,
    );
    this._error = error;
    this._errorMessage = errorMessage;
    this._statusCode = statusCode;
    this._errorCause = errorCause;
  }

  static ofInternalServerError(
    message?: string,
    errorCause?: unknown,
  ): ApiError {
    const _message = message ? message : 'Something went wrong';
    return new ApiError(
      _message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'InternalError',
      errorCause,
    );
  }

  get error(): string | undefined {
    return this._error;
  }

  get errorMessage(): string | string[] {
    return this._errorMessage;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCause(): unknown {
    return this._errorCause;
  }
}
