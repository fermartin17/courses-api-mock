import { IsUUID } from 'class-validator';

export class FindAllCohortsParamsDto {
  @IsUUID()
  courseId: string;
}
