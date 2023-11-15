import { Resolver, Query, ResolveField } from '@nestjs/graphql';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { LoggerService } from '~/common/logger/logger.service';
import { TaskRepository } from '~/task/repositories/task.repository';
import { Task } from '~/task/entities/task.entity';
import { Viewer } from '../entities/viewer.entity';
import { TaskStatus } from '~/task/entities/task-status.enum';
import { User } from '~/user/entities/user.entity';

@Resolver(() => Viewer)
export class ViewerResolver {
  constructor(
    private taskRepository: TaskRepository,
    private logger: LoggerService,
  ) {
    this.logger.setContext(ViewerResolver.name);
  }

  // @UseGuards(AuthGuard)
  @Query(() => Viewer, { nullable: true })
  async viewer(@CurrentUser() user: User) {
    if (user == null) return null;

    return user != null ? new Viewer(user) : null;
  }

  @ResolveField(() => [Task], { nullable: false })
  async tasks(@CurrentUser() user: User) {
    if (user == null) return [];

    const tasks = await this.taskRepository.findMany({
      ownerId: user.id,
    });

    return tasks;
  }

  @ResolveField(() => [String], { nullable: false })
  async taskStatuses(@CurrentUser() user: User) {
    if (user == null) return [];

    const statuses = Object.values(TaskStatus);

    return statuses;
  }
}
