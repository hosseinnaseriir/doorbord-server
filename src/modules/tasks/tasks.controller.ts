import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Version } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/entities';
import { Role } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/roles.enum';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get('all')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    getAllTasks() {
        return this.tasksService.getAllTasksService()
    }

    @Role(RoleEnum.SUPER_ADMIN) 
    @Post('create')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    createNewTask(@Body() task: CreateTaskDto) {
        return this.tasksService.createNewTaskService(task)
    }

    @Delete('destroy/:id')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    destroyTask(@Param() params: { id: number | string }) {
        return this.tasksService.destroyTaskService(params.id)
    }

}
