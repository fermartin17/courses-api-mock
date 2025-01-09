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
import { CreateCourseRequestDto } from './dto/create.course.request.dto';
import { Response } from 'express';
import { CreateCourseCommand } from '../../application/useCase/create.course.use.case';

@Controller('courses')
export class CreateCourseController extends ApiHandler {
  private readonly useCase: UseCase<CreateCourseCommand, string>;

  constructor(
    @Inject('CREATE_COURSE_USE_CASE')
    useCase: UseCase<CreateCourseCommand, string>,
  ) {
    super();
    this.useCase = useCase;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateCourseRequestDto, @Res() res: Response) {
    const command: CreateCourseCommand =
      CreateCourseController.buildCommandFromDto(body);

    try {
      const courseId: string = await this.useCase.execute(command);
      return res.setHeader('resource-id', courseId).send();
    } catch (error: unknown) {
      console.log(error);
      throw this.errorHandler.handle(error);
    }
  }

  private static buildCommandFromDto(
    body: CreateCourseRequestDto,
  ): CreateCourseCommand {
    return {
      ...body,
    };
  }
}
