import { Account as PrismaAccount, User as PrismaUser } from '@prisma/client';
import { User } from '~/user/entities/user.entity';

export class Account {
  id: string;
  firebaseAuthUid: string;
  email: string | null;

  user: User | null;

  constructor({
    user,
    ...partial
  }: Partial<Account & { user: PrismaUser | null }>) {
    Object.assign(this, partial);
    this.user = user ? new User(user) : null;
  }

  static from(data: PrismaAccount & { user: PrismaUser | null }) {
    return new Account({
      id: data.id,
      firebaseAuthUid: data.firebaseAuthUid,
      email: data.email,
      user: data.user,
    });
  }
}
