import {
  type CanActivate,
  type ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import USER_ROLES from 'src/core/domain/enums/enum-role-user';
import { ROLES_KEY } from '../../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  @Inject(Reflector)
  private reflector: Reflector;

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<USER_ROLES[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass,
    ]);
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return roles.some(
      (role) => user.role === role || user.role === USER_ROLES.ADMIN,
    );
  }
}
