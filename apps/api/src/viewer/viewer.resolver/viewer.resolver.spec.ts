import { Test, TestingModule } from '@nestjs/testing';
import { ViewerResolver } from './viewer.resolver';
import { UserRepository } from '~/user/repositories/user.repository';
import { CommonModule } from '~/common/common.module';

describe('ViewerResolver', () => {
  let viewerResolver: ViewerResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [ViewerResolver, UserRepository],
    }).compile();

    viewerResolver = module.get<ViewerResolver>(ViewerResolver);
  });
  it('should be defined', () => {
    expect(viewerResolver).toBeDefined();
  });
});
