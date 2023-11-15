import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RequestWithCurrentUser } from '../interfaces/request-with-current-user';
import { Account } from '../entities/account.entity';
import { User } from '~/user/entities/user.entity';

export type CurrentAccount = Account | null;
export type CurrentUser = User | null;
export type CurrentUserOrThrow = User;

export const CurrentAccount = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentAccount => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const req: RequestWithCurrentUser = gqlContext.getContext().req;
    return req.currentAccount ?? null;
  },
);

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUser => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const req: RequestWithCurrentUser = gqlContext.getContext().req;
    return req.currentUser ?? null;
  },
);

export const CurrentUserOrThrow = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUserOrThrow => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const req: RequestWithCurrentUser = gqlContext.getContext().req;
    if (req.currentUser == null) {
      throw new UnauthorizedException();
    }
    return req.currentUser;
  },
);
