import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TaskRepository } from './repositories/task.repository';
import { CommonModule } from '~/common/common.module';
import { AuthModule } from '~/auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule],
  providers: [TaskRepository, TaskResolver],
  exports: [TaskRepository, TaskResolver],
})
export class TaskModule {}
