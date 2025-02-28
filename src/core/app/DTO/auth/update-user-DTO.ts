import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from '@nestjs/class-validator';

export class UpdateUserParamsDTO {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    name: 'email',
    required: false,
    example: 'chloe@gmail.com',
  })
  email: string;

  @IsString()
  @Length(3, 15)
  @IsOptional()
  @ApiProperty({
    name: 'name',
    required: false,
    example: 'Chloe',
  })
  name: string;

  @IsString()
  @Length(6, 50)
  @IsOptional()
  @ApiProperty({
    name: 'password',
    required: false,
    example: '123456',
  })
  password: string;

  @IsString()
  @Length(8, 15)
  @IsOptional()
  @ApiProperty({
    name: 'cell_phone',
    required: false,
    example: '9999-9999',
  })
  cell_phone: string;
}
