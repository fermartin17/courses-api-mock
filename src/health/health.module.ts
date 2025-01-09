import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthHandler } from './infrastructure/health.handler';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthHandler],
})
export class HealthModule {}
