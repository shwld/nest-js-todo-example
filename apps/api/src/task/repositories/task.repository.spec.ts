import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { CommonModule } from '~/common/common.module';

describe('TaskRepository', () => {
  let taskRepository: TaskRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      providers: [TaskRepository],
    }).compile();

    taskRepository = module.get<TaskRepository>(TaskRepository);
  });
  it('should be defined', () => {
    expect(taskRepository).toBeDefined();
  });
});
