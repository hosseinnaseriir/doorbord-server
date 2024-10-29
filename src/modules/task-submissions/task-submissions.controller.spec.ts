import { Test, TestingModule } from '@nestjs/testing';
import { TaskSubmissionsController } from './task-submissions.controller';

describe('TaskSubmissionsController', () => {
  let controller: TaskSubmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskSubmissionsController],
    }).compile();

    controller = module.get<TaskSubmissionsController>(TaskSubmissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
