import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Version } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, CreateTaskFieldDto } from 'src/entities';
import { Role } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/roles.enum';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    // TASKS

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

    @Role(RoleEnum.SUPER_ADMIN)
    @Put('update/:id')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    updateTask(@Param() params: { id: number | string }, @Body() task: CreateTaskDto) {
        return this.tasksService.updateTaskService(+params.id, task)
    }

    @Role(RoleEnum.SUPER_ADMIN)
    @Delete('destroy/:id')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    destroyTask(@Param() params: { id: number | string }) {
        return this.tasksService.destroyTaskService(params.id)
    }


    // FIELDS

    @Get('fields')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    getAllTaskFields() {
        return this.tasksService.getAllTaskFieldsService()
    }

    @Role(RoleEnum.SUPER_ADMIN)
    @Post('fields')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    createNewTaskField(@Body() taskField: CreateTaskFieldDto) {
        return this.tasksService.createNewTaskFieldService(taskField)
    }

    @Get('fields/:id')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    getTaskFields(@Param() params: { id: number | string }) {
        return this.tasksService.getTaskFieldsByTaskId(+params.id)
    }

    @Role(RoleEnum.SUPER_ADMIN)
    @Put('fields/:id')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    updateTaskField(@Param() params: { id: number | string }, @Body() taskField: CreateTaskFieldDto) {
        return this.tasksService.updateTaskFieldService(+params.id, taskField);
    }

    @Role(RoleEnum.SUPER_ADMIN)
    @Delete('fields/:id')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    deleteTaskField(@Param() params: { id: number | string }) {
        return this.tasksService.deleteTaskFieldService(+params.id);
    }
}
