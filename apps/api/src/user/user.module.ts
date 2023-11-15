import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from './user.resolver';
import { CommonModule } from '~/common/common.module';
import { AuthModule } from '~/auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule],
  providers: [UserRepository, UserResolver],
  exports: [UserRepository, UserResolver],
})
export class UserModule {}
