import { Module } from '@nestjs/common';
import { TaskFieldsController } from './task-fields.controller';
import { TaskFieldsService } from './task-fields.service';
import { Task, TaskCategory, TaskField, TaskFieldOption, TaskFieldType, TaskFieldValue, TaskPermission, TaskSubmission } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskCategory, TaskField, TaskFieldOption, TaskFieldType, TaskPermission, TaskSubmission, TaskFieldValue]),
  ],
  controllers: [TaskFieldsController],
  providers: [TaskFieldsService]
})
export class TaskFieldsModule {}
