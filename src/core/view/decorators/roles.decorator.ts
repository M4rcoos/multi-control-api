import { SetMetadata } from '@nestjs/common';
import type UserTypeEnum from 'src/core/domain/enums/enum-role-user';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserTypeEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
