export class EntityDoesNotExistError extends Error {
  constructor(message = "Entity does not exist error.") {
    super(message);
  }
}
