import { InputType, Field, ID } from '@nestjs/graphql';
import { TaskStatus } from '../entities/task-status.enum';

@InputType()
export class UpdateTaskStatusInput {
  @Field(() => ID)
  id: string;

  @Field(() => TaskStatus)
  status?: TaskStatus;
}
