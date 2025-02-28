import { Inject, Injectable } from '@nestjs/common';
import UserRepository from '../../repositories/user/user.service';
import { FindByIdUserResponseDTO } from '../../DTO/user/find-by-id-user-DTO';

@Injectable()
export class UserFindByIdUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  async execute(user_id: number): Promise<FindByIdUserResponseDTO> {
    const { name, email, user_type_id, id, cell_phone } =
      await this.userRepository.findById(user_id);

    return {
      id: id,
      role: user_type_id,
      email,
      name,
      cell_phone,
    };
  }
}
