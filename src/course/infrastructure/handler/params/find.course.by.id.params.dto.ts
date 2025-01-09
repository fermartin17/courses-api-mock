import { IsUUID } from 'class-validator';

export class FindCourseByIdParamsDto {
  @IsUUID()
  id: string;
}
