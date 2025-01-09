export class CourseNotFoundError extends Error {
  constructor(message = 'category not found.') {
    super(message);
  }
}
