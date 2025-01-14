import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../shared/usecase.interface';
import { CohortPresenterDto } from './dto/presenter/cohort.presenter.dto';
import { CohortRepository } from '../../domain/cohort.repository';
import { FailToGetCohortError } from '../../error/fail.to.get.cohort.error';
import { CoursePresenterDto } from '../../../course/application/useCase/dto/presenter/course.presenter.dto';

export interface FindAllCohortsCommand {
  courseId: string;
}

@Injectable()
export class FindAllCohortsUseCase
  implements UseCase<FindAllCohortsCommand, CohortPresenterDto[]>
{
  private readonly cohortRepository: CohortRepository;

  constructor(
    @Inject('COHORT_REPOSITORY')
    cohortRepository: CohortRepository,
  ) {
    this.cohortRepository = cohortRepository;
  }

  async execute(command: FindAllCohortsCommand): Promise<CoursePresenterDto[]> {
    try {
      const cohorts = await this.cohortRepository.findAll(command.courseId);

      return cohorts.map<CohortPresenterDto>((cohort) => ({
        id: cohort.id,
        name: cohort.name,
        description: cohort.description,
      }));
    } catch (error: unknown) {
      throw new FailToGetCohortError((error as Error).message);
    }
  }
}
