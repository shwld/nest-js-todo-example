import { Request } from 'express';
import { Account } from '../entities/account.entity';
import { User } from '~/user/entities/user.entity';

export type CurrentFirebaseUser = {
  uid: string;
  email: string | null;
} | null;

export type RequestWithCurrentUser = Request & {
  currentFirebaseUser: CurrentFirebaseUser;
  currentAccount: Account | null;
  currentUser: User | null;
};
