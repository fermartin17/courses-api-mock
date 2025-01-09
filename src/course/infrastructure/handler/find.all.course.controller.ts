import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UseCase } from '../../../shared/usecase.interface';
import { ApiHandler } from '../../../shared/infrastructure/api.handler';
import { CoursePresenterDto } from '../../application/useCase/dto/presenter/course.presenter.dto';

@Controller('courses')
export class FindAllCourseController extends ApiHandler {
  private readonly useCase: UseCase<void, CoursePresenterDto[]>;

  constructor(
    @Inject('FIND_ALL_COURSES_USE_CASE')
    useCase: UseCase<void, CoursePresenterDto[]>,
  ) {
    super();
    this.useCase = useCase;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Res() res: Response) {
    try {
      const response = await this.useCase.execute();
      return res.send(response);
    } catch (error: unknown) {
      console.log(error);
      throw this.errorHandler.handle(error);
    }
  }
}
