import { Module } from '@nestjs/common';
import { TaskSubmissionsController } from './task-submissions.controller';
import { TaskSubmissionsService } from './task-submissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, TaskCategory, TaskField, TaskFieldOption, TaskFieldType, TaskFieldValue, TaskPermission, TaskSubmission } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskCategory, TaskField, TaskFieldOption, TaskFieldType, TaskPermission, TaskSubmission, TaskFieldValue]),
  ],
  controllers: [TaskSubmissionsController],
  providers: [TaskSubmissionsService]
})
export class TaskSubmissionsModule {}
