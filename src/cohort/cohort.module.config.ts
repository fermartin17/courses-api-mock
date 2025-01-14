import { CohortPostgresRepository } from './infrastructure/persistence/cohort.postgres.repository';
import { CreateCohortUseCase } from './application/useCase/create.cohort.use.case';
import { FindAllCohortsUseCase } from './application/useCase/find.all.cohorts.use.case';
import { FindCohortByIdUseCase } from './application/useCase/find.cohort.by.id.use.case';

export const cohortRepositoryTokenProvider = {
  provide: 'COHORT_REPOSITORY',
  useClass: CohortPostgresRepository,
};

export const createCohortUseCaseTokenProvider = {
  provide: 'CREATE_COHORT_USE_CASE',
  useClass: CreateCohortUseCase,
};

export const findCohortByIdUseCaseTokenProvider = {
  provide: 'FIND_COHORT_BY_ID_USE_CASE',
  useClass: FindCohortByIdUseCase,
};

export const findAllCohortsUseCaseTokenProvider = {
  provide: 'FIND_ALL_COHORTS_USE_CASE',
  useClass: FindAllCohortsUseCase,
};
