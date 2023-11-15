import { Test, TestingModule } from '@nestjs/testing';
import { CurrentUserGuard } from './current-user.guard';
import { LoggerService } from '~/common/logger/logger.service';
import { AccountRepository } from '../repositories/account.repository';

describe('CurrentUserGuard', () => {
  let guard: CurrentUserGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService, AccountRepository],
    }).compile();

    guard = module.get<CurrentUserGuard>(CurrentUserGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
