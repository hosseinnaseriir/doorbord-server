import { Test, TestingModule } from '@nestjs/testing';
import { TaskFieldsController } from './task-fields.controller';

describe('TaskFieldsController', () => {
  let controller: TaskFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskFieldsController],
    }).compile();

    controller = module.get<TaskFieldsController>(TaskFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
