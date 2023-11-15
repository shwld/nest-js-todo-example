import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/common/prisma/prisma.service';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  async save(task: Task): Promise<Task> {
    const newTask = await this.prisma.task.upsert({
      where: {
        id: task.id,
      },
      create: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        owner: {
          connect: {
            id: task.ownerId,
          },
        },
      },
      update: {
        title: task.title,
        description: task.description,
        status: task.status,
      },
    });

    return Task.from(newTask);
  }

  async find(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ): Promise<Task | null> {
    return this.prisma.task
      .findUnique({
        where: taskWhereUniqueInput,
      })
      .then((task) => (task == null ? null : Task.from(task)));
  }

  async findMany(
    taskWhereUniqueInput: Prisma.TaskWhereInput,
  ): Promise<Task[] | null> {
    return this.prisma.task
      .findMany({
        where: taskWhereUniqueInput,
      })
      .then((tasks) => tasks.map(Task.from));
  }
}
