import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../services/prisma.service';
import { GoogleProvider } from '../shared/provider/googleProvider';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, GoogleProvider],
  exports: [UserService],
})
export class UserModule {}
