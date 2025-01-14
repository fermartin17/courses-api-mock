export class CohortNotFoundError extends Error {
  constructor(message = 'Failed to get cohort.') {
    super();
  }
}