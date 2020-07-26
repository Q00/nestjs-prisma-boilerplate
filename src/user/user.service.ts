import { PrismaService } from '../services/prisma.service';
import { Inject, forwardRef, Injectable } from '@nestjs/common';
import { AuthService } from '../shared/auth/auth.service';
import { LoginInput } from './models/dto/login.input';
import { LoginResponse } from './models/dto/login.response';
import { Authentication } from './models/userAccount.model';
import { GoogleProvider } from '../shared/provider/googleProvider';
import { UserAccount, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly googleProvider: GoogleProvider,
    @Inject(forwardRef(() => AuthService))
    readonly _authService: AuthService,
  ) {}

  async getOrNewAccount(
    payload: LoginInput,
    // tslint:disable-next-line: no-any
    connector: GoogleProvider,
  ): Promise<UserAccount> {
    const { provider, accessToken } = payload;
    const clientId: string = String(await connector.getClientId(accessToken));

    const userAccount = await this.prisma.userAccount.findOne({
      where: {
        UserAccount_authentication_accountId_unique_constraint: {
          authentication: provider as Authentication,
          accountId: clientId,
        },
      },
    });
    if (userAccount) {
      return userAccount;
    } else {
      const userAccount: UserAccount = await this.prisma.userAccount.create({
        data: {
          authentication: provider as Authentication,
          accountId: clientId,
        },
      });
      return userAccount;
    }
  }

  async login(payload: LoginInput): Promise<LoginResponse> {
    const { provider } = payload;
    let connector: GoogleProvider;
    if (provider === 'GITHUB') {
      // github provider 연결
      connector = this.googleProvider;
    } else {
      connector = this.googleProvider;
    }

    const userAccount = await this.getOrNewAccount(payload, connector);

    const user: User | null = await this.prisma.user.findOne({
      where: { userAccountId: userAccount.id },
    });

    const auth: LoginResponse = {
      token: '',
    };

    if (user && user.deletedAt === null) {
      auth.token = this._authService.signPayload({ userId: user.id });
      return auth;
    } else {
      auth.token = '';
      auth.userAccountId = userAccount.id;
      return auth;
    }
  }

  async findOne(userId: number) {
    return this.prisma.user.findOne({ where: { id: userId } });
  }
}
