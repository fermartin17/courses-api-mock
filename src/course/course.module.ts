import { Module } from '@nestjs/common';
import { CreateCourseController } from './infrastructure/handler/create.course.controller';
import { FindCourseByIdController } from './infrastructure/handler/find.course.by.id.controller';
import { FindAllCourseController } from './infrastructure/handler/find.all.course.controller';
import {
  courseRepositoryTokenProvider,
  createCourseUseCaseTokenProvider,
  findAllCoursesUseCaseTokenProvider,
  findCourseByIdUseCaseTokenProvider,
} from './course.module.config';

@Module({
  imports: [],
  controllers: [
    CreateCourseController,
    FindCourseByIdController,
    FindAllCourseController,
  ],
  providers: [
    courseRepositoryTokenProvider,
    createCourseUseCaseTokenProvider,
    findCourseByIdUseCaseTokenProvider,
    findAllCoursesUseCaseTokenProvider,
  ],
  exports: [],
})
export class CourseModule {}
