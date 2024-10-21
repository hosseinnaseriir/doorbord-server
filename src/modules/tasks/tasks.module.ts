import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, TaskCategory, TaskField, TaskFieldOption, TaskFieldType, TaskPermission } from 'src/entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Task, TaskCategory, TaskField, TaskFieldOption, TaskFieldType, TaskPermission ]),
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
