import { IsNumber, IsString } from 'class-validator';
import { User } from '../user.model';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @Expose()
  @IsString()
  @ApiProperty({ type: String })
  token!: string;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, nullable: true })
  userAccountId?: number;

  @Expose()
  @ApiProperty({ type: User, nullable: true })
  user?: User;
}
