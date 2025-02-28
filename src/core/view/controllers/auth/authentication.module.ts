import { PrismaClient } from '@prisma/client';
import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import UserRepository from 'src/core/app/repositories/user/user.service';
import AuthenticateUseCase from 'src/core/app/usecases/authentitcation/authenticate-use-case.service';
import { JwtStrategy } from '../../middleware/authentication/jwt-strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Cryptor } from 'src/core/app/commons/crypto.service';

@Module({
  controllers: [AuthenticationController],
  providers: [
    PrismaClient,
    UserRepository,
    AuthenticateUseCase,
    JwtStrategy,
    Cryptor,
  ],
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthenticationModule {}
