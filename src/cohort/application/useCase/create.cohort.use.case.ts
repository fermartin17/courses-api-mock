import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../shared/usecase.interface';
import { CohortRepository } from '../../domain/cohort.repository';
import { Cohort } from '../../domain/cohort';
import { FailToCreateCohortError } from '../../error/fail.to.create.cohort.error';

export interface CreateCohortCommand {
  name: string;
  description: string;
  courseId: string;
}

@Injectable()
export class CreateCohortUseCase
  implements UseCase<CreateCohortCommand, string>
{
  private readonly cohortRepository: CohortRepository;

  constructor(
    @Inject('COHORT_REPOSITORY')
    cohortRepository: CohortRepository,
  ) {
    this.cohortRepository = cohortRepository;
  }

  async execute(command: CreateCohortCommand): Promise<string> {
    const cohort = new Cohort(
      command.name,
      command.description,
      command.courseId,
    );

    try {
      await this.cohortRepository.create(cohort);
      return cohort.id;
    } catch (error: any) {
      throw new FailToCreateCohortError(error.message);
    }
  }
}
