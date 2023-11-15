import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { CommonModule } from '~/common/common.module';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });
  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });
});
