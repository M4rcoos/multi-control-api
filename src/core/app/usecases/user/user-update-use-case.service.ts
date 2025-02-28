import { Inject, Injectable } from '@nestjs/common';
import type { UserEntity } from 'src/core/domain/entities/user-entity';
import UserRepository from '../../repositories/user/user.service';
import { UpdateUserParamsDTO } from '../../DTO/user/update-user-DTO';
import { Cryptor } from '../../commons/crypto.service';

@Injectable()
export class UserUpdateUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  @Inject(Cryptor)
  private readonly cryptor: Cryptor;

  async execute(id: number, user: UpdateUserParamsDTO): Promise<UserEntity> {
    if (user.password) {
      const hash = await this.cryptor.generateHashSHA1(user.password);
      user.password = hash;
    }

    return await this.userRepository.update(id, user);
  }
}
