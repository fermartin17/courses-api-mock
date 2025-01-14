import { Module } from '@nestjs/common';
import {
  cohortRepositoryTokenProvider,
  createCohortUseCaseTokenProvider,
  findAllCohortsUseCaseTokenProvider,
  findCohortByIdUseCaseTokenProvider,
} from './cohort.module.config';
import { CreateCohortController } from './infrastructure/handler/create.cohort.controller';
import { FindCohortByIdController } from './infrastructure/handler/find.cohort.by.id.controller';
import { FindAllCohortsController } from './infrastructure/handler/find.all.cohorts.controller';

@Module({
  imports: [],
  controllers: [
    CreateCohortController,
    FindCohortByIdController,
    FindAllCohortsController,
  ],
  providers: [
    cohortRepositoryTokenProvider,
    createCohortUseCaseTokenProvider,
    findCohortByIdUseCaseTokenProvider,
    findAllCohortsUseCaseTokenProvider,
  ],
  exports: [],
})
export class CohortModule {}
