import { CoursePostgresRepository } from './infrastructure/persistence/course.postgres.repository';
import { CreateCourseUseCase } from './application/useCase/create.course.use.case';
import { FindCourseByIdUseCase } from './application/useCase/find.course.by.id.use.case';
import { FindAllCoursesUseCase } from './application/useCase/find.all.courses.use.case';

export const courseRepositoryTokenProvider = {
  provide: 'COURSE_REPOSITORY',
  useClass: CoursePostgresRepository,
};

export const createCourseUseCaseTokenProvider = {
  provide: 'CREATE_COURSE_USE_CASE',
  useClass: CreateCourseUseCase,
};

export const findCourseByIdUseCaseTokenProvider = {
  provide: 'FIND_COURSE_BY_ID_USE_CASE',
  useClass: FindCourseByIdUseCase,
};

export const findAllCoursesUseCaseTokenProvider = {
  provide: 'FIND_ALL_COURSES_USE_CASE',
  useClass: FindAllCoursesUseCase,
};
