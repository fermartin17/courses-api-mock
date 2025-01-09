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
import { CoursePresenterDto } from '../../application/useCase/dto/presenter/course.presenter.dto';
import { FindCourseByIdParamsDto } from './params/find.course.by.id.params.dto';
import { ApiErrorHandler } from '../../../shared/errors/error.handler.strategies';
import { ApiError } from '../../../shared/errors/domain/api.error';
import { CourseNotFoundError } from '../../error/course.not.found.error';
import { FindCourseByIdCommand } from '../../application/useCase/find.course.by.id.use.case';

@Controller('courses')
export class FindCourseByIdController extends ApiHandler {
  private readonly useCase: UseCase<FindCourseByIdCommand, CoursePresenterDto>;

  constructor(
    @Inject('FIND_COURSE_BY_ID_USE_CASE')
    useCase: UseCase<FindCourseByIdCommand, CoursePresenterDto>,
  ) {
    super();
    this.useCase = useCase;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param() params: FindCourseByIdParamsDto,
    @Res() res: Response,
  ) {
    const command: FindCourseByIdCommand = { id: params.id };

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
      CourseNotFoundError.name,
      () =>
        new ApiError(
          'Course does not exist.',
          HttpStatus.NOT_FOUND,
          'Not Found.',
        ),
    );

    return errorHandler;
  }
}
