import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { ApiHandler } from '../../../shared/infrastructure/api.handler';
import { UseCase } from '../../../shared/usecase.interface';
import { Response } from 'express';
import { CreateCohortRequestDto } from './dto/create.cohort.request.dto';
import { CreateCohortCommand } from '../../application/useCase/create.cohort.use.case';

@Controller('cohorts')
export class CreateCohortController extends ApiHandler {
  private readonly useCase: UseCase<CreateCohortCommand, string>;

  constructor(
    @Inject('CREATE_COHORT_USE_CASE')
    useCase: UseCase<CreateCohortCommand, string>,
  ) {
    super();
    this.useCase = useCase;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateCohortRequestDto, @Res() res: Response) {
    const command: CreateCohortCommand =
      CreateCohortController.buildCommandFromDto(body);

    try {
      const cohortId: string = await this.useCase.execute(command);
      return res.setHeader('resource-id', cohortId).send();
    } catch (error: unknown) {
      console.log(error);
      throw this.errorHandler.handle(error);
    }
  }

  private static buildCommandFromDto(
    body: CreateCohortRequestDto,
  ): CreateCohortCommand {
    return {
      ...body,
    };
  }
}
