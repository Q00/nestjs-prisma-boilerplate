import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
// implements OnModuleInit, OnModuleDestroy {
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
  // async onModuleInit() {
  //   await this.connect();
  // }

  // async onModuleDestroy() {
  //   await this.disconnect();
  // }
}
