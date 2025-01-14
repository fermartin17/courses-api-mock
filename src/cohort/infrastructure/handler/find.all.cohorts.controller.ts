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
import { FindAllCohortsParamsDto } from './params/find.all.cohorts.params.dto';
import { CohortPresenterDto } from '../../application/useCase/dto/presenter/cohort.presenter.dto';
import { FindAllCohortsCommand } from '../../application/useCase/find.all.cohorts.use.case';

@Controller('cohorts')
export class FindAllCohortsController extends ApiHandler {
  private readonly useCase: UseCase<
    FindAllCohortsCommand,
    CohortPresenterDto[]
  >;

  constructor(
    @Inject('FIND_ALL_COHORTS_USE_CASE')
    useCase: UseCase<FindAllCohortsCommand, CohortPresenterDto[]>,
  ) {
    super();
    this.useCase = useCase;
  }

  @Get('courses/:courseId')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Param() params: FindAllCohortsParamsDto,
    @Res() res: Response,
  ) {
    const command: FindAllCohortsCommand = { courseId: params.courseId };

    try {
      const response = await this.useCase.execute(command);
      return res.send(response);
    } catch (error: unknown) {
      console.log(error);
      throw this.errorHandler.handle(error);
    }
  }
}
