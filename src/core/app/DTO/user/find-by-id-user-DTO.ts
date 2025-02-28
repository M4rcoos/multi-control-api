import { ApiProperty } from '@nestjs/swagger';
import { Transform } from '@nestjs/class-transformer';
import { IsNumber, IsPositive } from '@nestjs/class-validator';

export class FindByIdUserParamsDTO {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    name: 'id',
    description: 'Número de identificação do usuário',
    example: '1',
  })
  @Transform(({ value }) => parseInt(value))
  id: number;
}

export interface FindByIdUserResponseDTO {
  id: number;
  email: string;
  name: string;
  role: number;
  cell_phone: string;
}
