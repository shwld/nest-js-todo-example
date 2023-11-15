import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RequestWithCurrentUser } from '../interfaces/request-with-current-user';
import { LoggerService } from '~/common/logger/logger.service';

@Injectable()
export class CurrentUserGuard implements CanActivate {
  constructor(private logger: LoggerService) {
    this.logger.setContext(CurrentUserGuard.name);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req: RequestWithCurrentUser = ctx.getContext().req;
    return req.currentUser != null;
  }
}
