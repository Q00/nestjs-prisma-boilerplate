import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { sign, SignOptions } from 'jsonwebtoken';
import { UserService } from '../../user/user.service';
import { JwtPayload } from './jwt-payload.model';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;

  constructor(
    @Inject(forwardRef(() => UserService))
    readonly _userService: UserService,
  ) {
    this.jwtOptions = { expiresIn: '12h' };
    this.jwtKey = String(process.env.JWT_KEY);
  }

  signPayload(payload: JwtPayload): string {
    return sign(payload, this.jwtKey, this.jwtOptions);
  }

  async validateUser(validatePayload: JwtPayload): Promise<User | null> {
    return this._userService.findOne(validatePayload.userId);
  }
}
