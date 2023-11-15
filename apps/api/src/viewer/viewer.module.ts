import { Module } from '@nestjs/common';
import { ViewerResolver } from './viewer.resolver/viewer.resolver';
import { CommonModule } from '~/common/common.module';
import { UserModule } from '~/user/user.module';
import { TaskModule } from '~/task/task.module';
import { AuthModule } from '~/auth/auth.module';

@Module({
  imports: [CommonModule, UserModule, TaskModule, AuthModule],
  providers: [ViewerResolver],
})
export class ViewerModule {}
