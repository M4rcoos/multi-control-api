import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Cryptor } from 'src/core/app/commons/crypto.service';
import UserRepository from 'src/core/app/repositories/user/user.service';
import { UserCreateUseCase } from 'src/core/app/usecases/user/user-create-use-case.service';
import { UserFindAllUseCase } from 'src/core/app/usecases/user/user-find-all-use-case.service';
import { UserUpdateUseCase } from 'src/core/app/usecases/user/user-update-use-case.service';
import { UserController } from './user.controller';
import { UserFindByIdUseCase } from 'src/core/app/usecases/user/user-find-by-id-use-case.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaClient,
    UserRepository,
    UserFindAllUseCase,
    UserFindByIdUseCase,
    UserUpdateUseCase,
    UserCreateUseCase,
    Cryptor,
  ],
})
export class UserModule {}
