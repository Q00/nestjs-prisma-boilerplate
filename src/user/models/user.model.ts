import { BaseModel } from '../../shared/base.model';

export class User extends BaseModel {
  static get modelName(): string {
    return 'User';
  }
}
