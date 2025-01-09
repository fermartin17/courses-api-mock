import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../shared/usecase.interface';
import { CourseRepository } from '../../domain/course.repository';
import { CourseNotFoundError } from '../../error/course.not.found.error';
import { CoursePresenterDto } from './dto/presenter/course.presenter.dto';

export interface FindCourseByIdCommand {
  id: string;
}

@Injectable()
export class FindCourseByIdUseCase
  implements UseCase<FindCourseByIdCommand, CoursePresenterDto>
{
  private readonly courseRepository: CourseRepository;

  constructor(
    @Inject('COURSE_REPOSITORY')
    courseRepository: CourseRepository,
  ) {
    this.courseRepository = courseRepository;
  }

  async execute(command: FindCourseByIdCommand): Promise<CoursePresenterDto> {
    try {
      const course = await this.courseRepository.findById(command.id);

      if (!course) {
        throw new CourseNotFoundError(
          `there is no course with id: ${command.id}`,
        );
      }

      return {
        id: course.id,
        name: course.name,
        description: course.description,
      };
    } catch (error: unknown) {
      throw new CourseNotFoundError((error as Error).message);
    }
  }
}
