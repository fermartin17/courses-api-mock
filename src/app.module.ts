import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course/course.module';
import { HealthModule } from './health/health.module';
import { CohortModule } from './cohort/cohort.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    HealthModule,
    CourseModule,
    CohortModule,
  ],
})
export class AppModule {}
