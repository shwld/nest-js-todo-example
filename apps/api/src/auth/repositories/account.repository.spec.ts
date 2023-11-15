import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from './account.repository';

describe('AccountRepository', () => {
  let guard: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountRepository],
    }).compile();

    guard = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
