import { Course } from './course';

export interface CourseRepository {
  findAll(): Promise<Course[]>;
  findById(id: string): Promise<Course>;
  create(category: Course): Promise<void>;
}
