import { Injectable } from '@nestjs/common';
import { ErrorTracer } from '../../../shared/errors/domain/error.tracer';
import { CohortRepository } from '../../domain/cohort.repository';
import { Cohort } from '../../domain/cohort';
import { FailToGetCohortError } from '../../error/fail.to.get.cohort.error';
import { CohortNotFoundError } from '../../error/cohort.not.found.error';
import { FailToCreateCohortError } from '../../error/fail.to.create.cohort.error';

@Injectable()
export class CohortPostgresRepository implements CohortRepository {
  private readonly cohorts: Cohort[];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this.cohorts = [];
  }

  async findAll(courseId: string): Promise<Cohort[]> {
    try {
      return this.cohorts.filter(
        (cohort: Cohort) => cohort.courseId === courseId,
      );
    } catch (error: unknown) {
      throw new FailToGetCohortError(
        ErrorTracer.generateErrorMessage(
          CohortPostgresRepository.name,
          'findAll',
          `Failed to get cohorts`,
        ),
      );
    }
  }

  async findById(id: string): Promise<Cohort> {
    try {
      return this.cohorts.find((cohort: Cohort) => cohort.id === id);
    } catch (error: unknown) {
      throw new CohortNotFoundError(
        ErrorTracer.generateErrorMessage(
          CohortPostgresRepository.name,
          'findById',
          `Failed to get cohort with id ${id}`,
        ),
      );
    }
  }

  async create(cohort: Cohort): Promise<void> {
    try {
      this.cohorts.push(cohort);
    } catch (error: unknown) {
      throw new FailToCreateCohortError(
        ErrorTracer.generateErrorMessage(
          CohortPostgresRepository.name,
          'create',
          `Failed to create cohort with name ${cohort.name}`,
        ),
      );
    }
  }
}
