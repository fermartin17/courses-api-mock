import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../shared/usecase.interface';
import { Course } from '../../domain/course';
import { CourseRepository } from '../../domain/course.repository';
import { FailToCreateCourseError } from '../../error/fail.to.create.course.error';

export interface CreateCourseCommand {
  name: string;
  description: string;
}

@Injectable()
export class CreateCourseUseCase
  implements UseCase<CreateCourseCommand, string>
{
  private readonly courseRepository: CourseRepository;

  constructor(
    @Inject('COURSE_REPOSITORY')
    courseRepository: CourseRepository,
  ) {
    this.courseRepository = courseRepository;
  }

  async execute(command: CreateCourseCommand): Promise<string> {
    const course = new Course(command.name, command.description);

    try {
      await this.courseRepository.create(course);
      return course.id;
    } catch (error: any) {
      throw new FailToCreateCourseError(error.message);
    }
  }
}
