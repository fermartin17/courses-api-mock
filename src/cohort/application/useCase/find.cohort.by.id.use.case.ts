import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../../shared/usecase.interface';
import { CohortPresenterDto } from './dto/presenter/cohort.presenter.dto';
import { CohortRepository } from '../../domain/cohort.repository';
import { CohortNotFoundError } from '../../error/cohort.not.found.error';

export interface FindCohortByIdCommand {
  id: string;
}

@Injectable()
export class FindCohortByIdUseCase
  implements UseCase<FindCohortByIdCommand, CohortPresenterDto>
{
  private readonly cohortRepository: CohortRepository;

  constructor(
    @Inject('COHORT_REPOSITORY')
    cohortRepository: CohortRepository,
  ) {
    this.cohortRepository = cohortRepository;
  }

  async execute(command: FindCohortByIdCommand): Promise<CohortPresenterDto> {
    try {
      const cohort = await this.cohortRepository.findById(command.id);

      if (!cohort) {
        throw new CohortNotFoundError(
          `there is no cohort with id: ${command.id}`,
        );
      }

      return {
        id: cohort.id,
        name: cohort.name,
        description: cohort.description,
      };
    } catch (error: unknown) {
      throw new CohortNotFoundError((error as Error).message);
    }
  }
}
