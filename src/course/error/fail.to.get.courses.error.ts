export class FailToGetCoursesError extends Error {
  constructor(message = 'Failed to get categories.') {
    super(message);
  }
}
