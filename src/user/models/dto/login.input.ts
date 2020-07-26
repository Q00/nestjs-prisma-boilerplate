import { IsEnum, IsString } from 'class-validator';
import { Authentication } from '../userAccount.model';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginInput {
  @Expose()
  @IsEnum(Authentication)
  @ApiProperty({ enum: Object.keys(Authentication) })
  provider!: Authentication;

  @Expose()
  @IsString()
  @ApiProperty({ type: String })
  accessToken!: string;
}
