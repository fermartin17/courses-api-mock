import { IsUUID } from 'class-validator';

export class FindCohortByIdParamsDto {
  @IsUUID()
  id: string;
}