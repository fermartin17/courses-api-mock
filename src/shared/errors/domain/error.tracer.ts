export class ErrorTracer {
  static generateErrorMessage(
    originClass: string,
    originMethod: string,
    message: string,
  ): string {
    return `\nCLASS: ${originClass}\n METHOD: ${originMethod}\n MESSAGE: ${message}`;
  }
}
