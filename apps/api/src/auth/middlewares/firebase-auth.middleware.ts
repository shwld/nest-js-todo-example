import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { RequestWithCurrentUser } from '../interfaces/request-with-current-user';
import { LoggerService } from '~/common/logger/logger.service';
import { AccountRepository } from '../repositories/account.repository';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: LoggerService,
    private readonly accountRepository: AccountRepository,
  ) {
    this.logger.setContext(FirebaseAuthMiddleware.name);
  }

  async use(req: RequestWithCurrentUser, _: Response, next: NextFunction) {
    const { authorization } = req.headers;
    req.currentFirebaseUser = null;
    if (authorization) {
      const [scheme, token] = req.headers.authorization?.split(' ') ?? [];
      if (scheme === 'Bearer') {
        const decodedIdToken = await getAuth().verifyIdToken(token);
        const currentFirebaseUser = {
          uid: decodedIdToken.uid,
          email: decodedIdToken.email ?? null,
        };
        const account =
          await this.accountRepository.findOrCreateByFirebaseAuthUid(
            currentFirebaseUser,
          );
        req.currentFirebaseUser = currentFirebaseUser;
        req.currentAccount = account;
        req.currentUser = account.user ?? null;
      }
    }
    next();
  }
}
