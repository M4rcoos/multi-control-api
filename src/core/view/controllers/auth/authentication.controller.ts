import AuthenticateUseCase from 'src/core/app/usecases/authentitcation/authenticate-use-case.service';
import { ok } from 'src/core/domain/http/api-response';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import AuthenticateDTO from 'src/core/app/DTO/auth/authenticate-DTO';
import { Public } from '../../decorators/public.decorator';

@Controller('authentication')
export class AuthenticationController {
  @Inject(AuthenticateUseCase)
  private readonly AuthenticateUseCase: AuthenticateUseCase;

  @Public()
  @HttpCode(200)
  @Post('login')
  async auth(@Body() login: AuthenticateDTO) {
    const token = await this.AuthenticateUseCase.execute(login);
    return ok({ payload: { token } });
  }
}
