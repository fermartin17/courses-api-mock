import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UseCase } from '../../../shared/usecase.interface';
import { ApiHandler } from '../../../shared/infrastructure/api.handler';
import { ApiErrorHandler } from '../../../shared/errors/error.handler.strategies';
import { ApiError } from '../../../shared/errors/domain/api.error';
import { FindCohortByIdParamsDto } from './params/find.cohort.by.id.params.dto';
import { FindCohortByIdCommand } from '../../application/useCase/find.cohort.by.id.use.case';
import { CohortPresenterDto } from '../../application/useCase/dto/presenter/cohort.presenter.dto';
import { CohortNotFoundError } from '../../error/cohort.not.found.error';

@Controller('cohorts')
export class FindCohortByIdController extends ApiHandler {
  private readonly useCase: UseCase<FindCohortByIdCommand, CohortPresenterDto>;

  constructor(
    @Inject('FIND_COHORT_BY_ID_USE_CASE')
    useCase: UseCase<FindCohortByIdCommand, CohortPresenterDto>,
  ) {
    super();
    this.useCase = useCase;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param() params: FindCohortByIdParamsDto,
    @Res() res: Response,
  ) {
    const command: FindCohortByIdCommand = { id: params.id };

    try {
      const response = await this.useCase.execute(command);
      return res.send(response);
    } catch (error: unknown) {
      console.log(error);
      throw this.errorHandler.handle(error);
    }
  }

  protected buildErrorHandler(): ApiErrorHandler {
    const errorHandler: ApiErrorHandler = super.buildErrorHandler();
    errorHandler.addErrorHandler(
      CohortNotFoundError.name,
      () =>
        new ApiError(
          'Cohort does not exist.',
          HttpStatus.NOT_FOUND,
          'Not Found.',
        ),
    );

    return errorHandler;
  }
}
