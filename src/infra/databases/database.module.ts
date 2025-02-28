import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/databases/database.service';

@Global()
@Module({
  exports: [PrismaService],
  providers: [PrismaService],
})
export default class PrismaModule {}
