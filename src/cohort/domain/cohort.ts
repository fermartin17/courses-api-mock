import { v4 as uuidv4 } from 'uuid';

export class Cohort {
  private _id: string;
  private _name: string;
  private _description: string;
  private _courseId: string;

  constructor(
    name: string,
    description: string,
    courseId: string,
    id?: string,
  ) {
    this._id = id ?? uuidv4();
    this._name = name;
    this._description = description;
    this._courseId = courseId;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get courseId(): string {
    return this._courseId;
  }
}
