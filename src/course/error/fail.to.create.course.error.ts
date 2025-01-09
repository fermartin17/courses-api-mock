export class FailToCreateCourseError extends Error {
  constructor(message = 'Failed to create category.') {
    super(message);
  }
}
