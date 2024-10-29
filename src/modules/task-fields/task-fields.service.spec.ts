import { Test, TestingModule } from '@nestjs/testing';
import { TaskFieldsService } from './task-fields.service';

describe('TaskFieldsService', () => {
  let service: TaskFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskFieldsService],
    }).compile();

    service = module.get<TaskFieldsService>(TaskFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
