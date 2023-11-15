import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import type { User } from '../../user/entities/user.entity';

@ObjectType()
export class Viewer {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String)
  name: string;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
