import { Inject, Injectable } from '@nestjs/common';
import type {
  FindAllUserParamsDTO,
  FindAllUserResponseDTO,
} from '../../DTO/user/find-all-user-DTO';
import UserRepository from '../../repositories/user/user.service';

@Injectable()
export class UserFindAllUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  async execute({
    limit = 20,
    page = 1,
  }: FindAllUserParamsDTO): Promise<FindAllUserResponseDTO[]> {
    // const users: UserEntity[] = await this.userRepository.findAll(page, limit)

    return await this.userRepository.findAll(page, limit);
  }
}
