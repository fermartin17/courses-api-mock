import { v4 as uuidv4 } from 'uuid';

export class Course {
  private _id: string;
  private _name: string;
  private _description: string;

  constructor(name: string, description: string, id?: string) {
    this._id = id ?? uuidv4();
    this._name = name;
    this._description = description;
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
}
