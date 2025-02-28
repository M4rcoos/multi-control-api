import { Module } from '@nestjs/common';
import { AuthenticationGuard } from './core/view/middleware/authentication/authentication-guard';
import { RolesGuard } from './core/view/middleware/roles/roles-guard';
import PrismaModule from './infra/databases/database.module';
import { UserModule } from './core/view/controllers/user/user.module';
import { AuthenticationModule } from './core/view/controllers/auth/authentication.module';

@Module({
  imports: [PrismaModule, UserModule, AuthenticationModule],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthenticationGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
