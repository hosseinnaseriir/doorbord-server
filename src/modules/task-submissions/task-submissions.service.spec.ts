import { Test, TestingModule } from '@nestjs/testing';
import { TaskSubmissionsService } from './task-submissions.service';

describe('TaskSubmissionsService', () => {
  let service: TaskSubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskSubmissionsService],
    }).compile();

    service = module.get<TaskSubmissionsService>(TaskSubmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
