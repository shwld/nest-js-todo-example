import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAuthMiddleware } from './firebase-auth.middleware';
import { CommonModule } from '~/common/common.module';

describe('FirebaseAuthMiddleware', () => {
  let firebaseAuth: FirebaseAuthMiddleware;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [],
    }).compile();

    firebaseAuth = module.get<FirebaseAuthMiddleware>(FirebaseAuthMiddleware);
  });
  it('should be defined', () => {
    expect(firebaseAuth).toBeDefined();
  });
});
