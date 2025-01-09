import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthHandler {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get()
  @HealthCheck()
  @HttpCode(HttpStatus.OK)
  check() {
    return;
  }
}
