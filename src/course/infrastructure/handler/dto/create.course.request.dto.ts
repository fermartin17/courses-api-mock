import { Length } from 'class-validator';

export class CreateCourseRequestDto {
  @Length(4, 40)
  name: string;

  @Length(5, 200)
  description: string;
}
