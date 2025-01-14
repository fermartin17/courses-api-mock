import { IsUUID, Length } from 'class-validator';

export class CreateCohortRequestDto {
  @Length(4, 40)
  name: string;

  @Length(5, 200)
  description: string;

  @IsUUID()
  courseId: string;
}
