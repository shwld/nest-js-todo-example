import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Task as PrismaTask,
  TaskStatus as PrismaTaskStatus,
} from '@prisma/client';
import { IsUUID, IsNotEmpty, MaxLength } from 'class-validator';
import { TaskStatus } from './task-status.enum';

@ObjectType()
export class Task {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @Field(() => String, { nullable: true })
  @MaxLength(300)
  description: string | null;

  @Field(() => TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }

  ownerId: string;

  static from(record: PrismaTask & { status: PrismaTaskStatus }) {
    return new Task({
      id: record.id,
      title: record.title,
      description: record.description,
      status: record.status,
      ownerId: record.ownerId,
    });
  }
}
