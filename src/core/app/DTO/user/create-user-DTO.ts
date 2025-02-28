import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from '@nestjs/class-validator';
import type { UserEntity } from 'src/core/domain/entities/user-entity';

export class CreateUserParamsDTO {
  @IsEmail()
  @ApiProperty({
    name: 'email',
    example: 'chloe@example.com',
  })
  email: string;

  @IsString()
  @Length(3, 15)
  @ApiProperty({
    name: 'name',
    example: 'Chloe',
  })
  name: string;

  @IsString()
  @Length(6, 50)
  @ApiProperty({
    name: 'password',
    example: '123456',
  })
  password: string;
}

export interface CreateUserResponseDTO
  extends Pick<UserEntity, 'name' | 'email' | 'id'> {
  token: string;
  role: number;
}
