import { Controller, Get, Version } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }
    
    @Get('all')
    @Version('1')
    getAllTasks() {
        return this.tasksService.getAllTasksService()
    }

}
