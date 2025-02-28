import {
  Global,
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error('Connection to database refused');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
