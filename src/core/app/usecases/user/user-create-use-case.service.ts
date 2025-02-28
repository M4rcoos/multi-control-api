import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type {
  CreateUserParamsDTO,
  CreateUserResponseDTO,
} from '../../DTO/user/create-user-DTO';
import { Cryptor } from '../../commons/crypto.service';
import UserRepository from '../../repositories/user/user.service';

@Injectable()
export class UserCreateUseCase {
  @Inject(Cryptor)
  private readonly crypto: Cryptor;

  @Inject(UserRepository)
  private readonly userRepo: UserRepository;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async execute({
    email,
    name,
    password,
  }: CreateUserParamsDTO): Promise<CreateUserResponseDTO> {
    password = await this.crypto.generateHashSHA1(password);

    const user = await this.userRepo.create({
      email,
      name,
      password,
    });

    const token = await this.jwtService.sign(user, {
      secret: process.env.JWT_SECRET,
    });

    return {
      ...user,
      token,
    };
  }
}
