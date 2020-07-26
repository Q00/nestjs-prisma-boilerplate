import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import { PrismaService } from './services/prisma.service';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [UserModule, SharedModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
