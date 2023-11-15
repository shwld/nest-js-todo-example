import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskStatusInput } from './dto/update-task-status.input';
import { TaskRepository } from './repositories/task.repository';
import { randomUUID } from 'crypto';
import { CurrentUserOrThrow } from '~/auth/decorators/current-user.decorator';
import { LoggerService } from '~/common/logger/logger.service';
import { TaskStatus } from './entities/task-status.enum';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private taskRepository: TaskRepository,
    private logger: LoggerService,
  ) {
    this.logger.setContext(TaskResolver.name);
  }

  @Mutation(() => Task, { nullable: true })
  async createTask(
    @CurrentUserOrThrow() user: CurrentUserOrThrow,
    @Args('input') input: CreateTaskInput,
  ) {
    const task = new Task({
      id: randomUUID(),
      title: input.title,
      description: input.description,
      status: TaskStatus.TODO,
      ownerId: user.id,
    });
    return this.taskRepository.save(task);
  }

  @Mutation(() => Task, { nullable: true })
  async updateTaskStatus(
    @CurrentUserOrThrow() user: CurrentUserOrThrow,
    @Args('input') input: UpdateTaskStatusInput,
  ) {
    const oldTask = await this.taskRepository.find({
      id: input.id,
      ownerId: user.id,
    });
    const newTask = new Task({
      ...oldTask,
      status: input.status,
    });
    return this.taskRepository.save(newTask);
  }
}
