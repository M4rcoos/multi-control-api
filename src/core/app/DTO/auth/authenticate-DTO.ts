import { IsEmail, IsString, Length } from '@nestjs/class-validator';

export default class AuthenticateDTO {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 50)
  password: string;
}
