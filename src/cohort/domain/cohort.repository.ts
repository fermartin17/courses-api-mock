import { Cohort } from './cohort';

export interface CohortRepository {
  findAll(courseId: string): Promise<Cohort[]>;
  findById(id: string): Promise<Cohort>;
  create(category: Cohort): Promise<void>;
}
