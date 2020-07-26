import { User } from './user.model';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Authentication {
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB',
}

export class UserAccount {
  @ApiProperty({ enum: Object.keys(Authentication) })
  authentication!: Authentication;

  @IsString()
  @ApiProperty({ type: String })
  accountId!: string;

  user?: User;

  static get modelName(): string {
    return 'User';
  }
}
