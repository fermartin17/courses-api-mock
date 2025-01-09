import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../shared/usecase.interface';
import { CourseRepository } from '../../domain/course.repository';
import { CoursePresenterDto } from './dto/presenter/course.presenter.dto';
import { FailToGetCoursesError } from '../../error/fail.to.get.courses.error';

@Injectable()
export class FindAllCoursesUseCase
  implements UseCase<void, CoursePresenterDto[]>
{
  private readonly courseRepository: CourseRepository;

  constructor(
    @Inject('COURSE_REPOSITORY')
    courseRepository: CourseRepository,
  ) {
    this.courseRepository = courseRepository;
  }

  async execute(_: void): Promise<CoursePresenterDto[]> {
    try {
      const courses = await this.courseRepository.findAll();

      return courses.map<CoursePresenterDto>((course) => ({
        id: course.id,
        name: course.name,
        description: course.description,
      }));
    } catch (error: unknown) {
      throw new FailToGetCoursesError((error as Error).message);
    }
  }
}
