import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/common/prisma/prisma.service';
import { User } from '../../user/entities/user.entity';
import { Account } from '~/auth/entities/account.entity';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async find(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user
      .findUnique({
        where: userWhereUniqueInput,
      })
      .then((user) => (user == null ? null : User.from(user)));
  }

  async create(data: { username: string; account: Account }): Promise<User> {
    return this.prisma.user
      .create({
        data: {
          name: data.username,
          account: {
            connect: {
              id: data.account.id,
            },
          },
        },
      })
      .then(User.from);
  }
}
