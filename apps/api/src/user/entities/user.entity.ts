import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { User as PrismaUser } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String)
  name: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  static from(data: PrismaUser) {
    return new User({
      id: data.id,
      name: data.name,
    });
  }
}
