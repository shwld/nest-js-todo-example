import { Module } from '@nestjs/common';
import { FirebaseAuthMiddleware } from './middlewares/firebase-auth.middleware';
import { CurrentUserGuard } from './guards/current-user.guard';
import { AccountRepository } from './repositories/account.repository';
import { CommonModule } from '~/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [FirebaseAuthMiddleware, CurrentUserGuard, AccountRepository],
  exports: [FirebaseAuthMiddleware, CurrentUserGuard, AccountRepository],
})
export class AuthModule {}
