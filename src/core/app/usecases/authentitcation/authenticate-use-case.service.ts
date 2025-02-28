import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserRepository from '../../repositories/user/user.service';
import AuthenticateDTO from '../../DTO/auth/authenticate-DTO';
import USER_ROLES from 'src/core/domain/enums/enum-role-user';
import { Cryptor } from '../../commons/crypto.service';

@Injectable()
export default class AuthenticateUseCase {
  @Inject(Cryptor)
  private readonly crypto: Cryptor;

  @Inject(UserRepository)
  private readonly userRepo: UserRepository;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async execute({ email, password }: AuthenticateDTO): Promise<string | void> {
    const user = await this.userRepo.findByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    const NotAuthorizedUser =
      user.user_type_id !== USER_ROLES.ADMIN &&
      user.user_type_id !== USER_ROLES.COMUN;
    if (NotAuthorizedUser)
      throw new NotAcceptableException('User not authorized');

    const hashedPassword = await this.crypto.generateHashSHA1(password);
    const passwordIsDiferent = user.password !== hashedPassword;

    if (passwordIsDiferent) throw new NotFoundException('User not found');

    const infoToken = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.user_type_id,
    };

    return this.jwtService.sign(infoToken, {
      secret: process.env.JWT_SECRET,
    });
  }
}
