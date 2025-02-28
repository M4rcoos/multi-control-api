import { IsNumber, IsOptional, IsPositive } from '@nestjs/class-validator';
import type { UserEntity } from 'src/core/domain/entities/user-entity';

export class FindAllUserParamsDTO {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  page: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit: number;
}

export interface FindAllUserResponseDTO
  extends Pick<UserEntity, 'name' | 'email' | 'user_type_id' | 'id'> {}
