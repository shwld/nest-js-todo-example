import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/common/prisma/prisma.service';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  async findByFirebaseAuthUid({
    uid,
  }: {
    uid: string;
  }): Promise<Account | null> {
    return this.prisma.account
      .findUnique({
        where: { firebaseAuthUid: uid },
        include: { user: true },
      })
      .then((account) => (account == null ? null : Account.from(account)));
  }

  async findOrCreateByFirebaseAuthUid({
    uid,
    email,
  }: {
    uid: string;
    email: string | null;
  }): Promise<Account> {
    return this.prisma.account
      .upsert({
        where: { firebaseAuthUid: uid },
        update: {},
        create: { firebaseAuthUid: uid, email },
        include: { user: true },
      })
      .then(Account.from);
  }
}
