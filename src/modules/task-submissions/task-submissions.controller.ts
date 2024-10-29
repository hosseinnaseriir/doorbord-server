import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Version } from '@nestjs/common';
import { TaskSubmissionsService } from './task-submissions.service';
import { Role } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums';
import { TaskSubmission, TaskSubmissionDto } from 'src/entities';

@Controller('tasks')
export class TaskSubmissionsController {
    constructor(private readonly tasksService: TaskSubmissionsService) { }

    // SUBMIT A TASK FORM
    @Role(RoleEnum.SUPER_ADMIN)
    @Post('form/:id')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    saveTaskForm(@Param() params: { id: number | string }, @Body() taskSubmittionDto: TaskSubmissionDto) {
        return this.tasksService.saveTaskSubmission(+params.id, taskSubmittionDto);
    }

    @Role(RoleEnum.SUPER_ADMIN, RoleEnum.SUPERVISOR)
    @Get('submissions')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    getAllTaskForms(): Promise<TaskSubmission[]> {
        return this.tasksService.findAllTaskSubmissions();
    }

    @Role(RoleEnum.SUPER_ADMIN, RoleEnum.SUPERVISOR)
    @Get('submissions/:id')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    getTaskFormById(@Param('id') id: number | string): Promise<TaskSubmission> {
        return this.tasksService.findTaskSubmissionById(+id);
    }

    @Role(RoleEnum.SUPER_ADMIN)
    @Delete('submissions/:id')
    @Version('1')
    @HttpCode(HttpStatus.OK)
    deleteTaskFormById(@Param('id') id: number | string): Promise<void> {
        return this.tasksService.deleteTaskSubmissionById(+id);
    }
}
