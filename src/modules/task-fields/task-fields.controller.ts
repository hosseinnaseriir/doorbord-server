import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Version } from '@nestjs/common';
import { CreateTaskFieldDto } from 'src/entities';
import { Role } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/roles.enum';
import { TaskFieldsService } from './task-fields.service';

@Controller('tasks/fields')
export class TaskFieldsController {
    constructor(private readonly tasksService: TaskFieldsService) {}

    @Get()
    @Version('1')
    @HttpCode(HttpStatus.OK)
    getAllTaskFields() {
        return this.tasksService.getAllTaskFieldsService()
    }

    @Role(RoleEnum.SUPER_ADMIN)
    @Post()
    @Version('1')
    @HttpCode(HttpStatus.OK)
    createNewTaskField(@Body() taskField: CreateTaskFieldDto) {
        return this.tasksService.createNewTaskFieldService(taskField)
    }

    @Get('/:id')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    getTaskFields(@Param() params: { id: number | string }) {
        return this.tasksService.getTaskFieldsByTaskId(+params.id)
    }

    @Role(RoleEnum.SUPER_ADMIN)
    @Put('/:id')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    updateTaskField(@Param() params: { id: number | string }, @Body() taskField: CreateTaskFieldDto) {
        return this.tasksService.updateTaskFieldService(+params.id, taskField);
    }

    @Role(RoleEnum.SUPER_ADMIN)
    @Delete('/:id')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    deleteTaskField(@Param() params: { id: number | string }) {
        return this.tasksService.deleteTaskFieldService(+params.id);
    }
}
