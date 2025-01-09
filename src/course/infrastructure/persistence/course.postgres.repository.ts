import { Injectable } from '@nestjs/common';
import { ErrorTracer } from '../../../shared/errors/domain/error.tracer';
import { Course } from '../../domain/course';
import { CourseRepository } from '../../domain/course.repository';
import { FailToCreateCourseError } from '../../error/fail.to.create.course.error';
import { FailToGetCoursesError } from '../../error/fail.to.get.courses.error';
import { CourseNotFoundError } from '../../error/course.not.found.error';

@Injectable()
export class CoursePostgresRepository implements CourseRepository {
  private readonly courses: Course[];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this.courses = [];
  }

  async findAll(): Promise<Course[]> {
    try {
      return this.courses;
    } catch (error: unknown) {
      throw new FailToGetCoursesError(
        ErrorTracer.generateErrorMessage(
          CoursePostgresRepository.name,
          'findAll',
          `Failed to get courses`,
        ),
      );
    }
  }

  async findById(id: string): Promise<Course> {
    try {
      return this.courses.find((course: Course) => course.id === id);
    } catch (error: unknown) {
      throw new CourseNotFoundError(
        ErrorTracer.generateErrorMessage(
          CoursePostgresRepository.name,
          'findById',
          `Failed to get course with id ${id}`,
        ),
      );
    }
  }

  async create(course: Course): Promise<void> {
    try {
      this.courses.push(course);
    } catch (error: unknown) {
      throw new FailToCreateCourseError(
        ErrorTracer.generateErrorMessage(
          CoursePostgresRepository.name,
          'create',
          `Failed to create course with name ${course.name}`,
        ),
      );
    }
  }
}
