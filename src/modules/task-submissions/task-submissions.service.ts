import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskSubmissionStatus } from 'src/common/enums';
import { Task, TaskCategory, TaskField, TaskFieldOption, TaskFieldType, TaskFieldValue, TaskPermission, TaskSubmission, TaskSubmissionDto } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TaskSubmissionsService {
    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>,
        @InjectRepository(TaskField) private taskFieldRepository: Repository<TaskField>,
        @InjectRepository(TaskFieldOption) private taskFieldOptionRepository: Repository<TaskFieldOption>,
        @InjectRepository(TaskPermission) private taskPermissionRepository: Repository<TaskPermission>,
        @InjectRepository(TaskCategory) private taskCategoryRepository: Repository<TaskCategory>,
        @InjectRepository(TaskFieldType) private taskFieldTypeRepository: Repository<TaskFieldType>,
        @InjectRepository(TaskSubmission) private readonly taskSubmissionRepository: Repository<TaskSubmission>,
        @InjectRepository(TaskFieldValue) private readonly taskFieldValueRepository: Repository<TaskFieldValue>,
    ) { }
    async saveTaskSubmission(taskId: number, taskSubmittionDto: TaskSubmissionDto) {
        const task = await this.taskRepository.findOne({ where: { id: taskId } });

        if (!taskSubmittionDto.fields || taskSubmittionDto.fields.length === 0) {
            throw new HttpException('پر کردن فیلد ها الزامی است!', HttpStatus.BAD_REQUEST);
        }
        const taskSubmission = new TaskSubmission();
        taskSubmission.task = task;
        taskSubmission.submittedAt = new Date();
        taskSubmission.status = taskSubmittionDto.status || TaskSubmissionStatus.BACKLOG;
        const savedSubmission = await this.taskSubmissionRepository.save(taskSubmission);

        const valuesToSave = taskSubmittionDto.fields?.map(fv => {
            const fieldValue = new TaskFieldValue();
            fieldValue.submission = savedSubmission;
            fieldValue.field = { id: fv.fieldId } as TaskField;
            fieldValue.value = fv.value;
            return fieldValue;
        });

        const taskField = await this.taskFieldValueRepository.save(valuesToSave);

        return taskField
    }

    async findAllTaskSubmissions(): Promise<TaskSubmission[]> {
        return this.taskSubmissionRepository.find({ relations: ['task', 'fieldValues', 'fieldValues.field'] });
    }

    async findTaskSubmissionById(id: number): Promise<TaskSubmission> {
        const taskSubmission = await this.taskSubmissionRepository.findOne({
            where: { id },
            relations: ['task', 'fieldValues', 'fieldValues.field'],
        });

        if (!taskSubmission) {
            throw new HttpException('ماموریت پیدا نشد!', HttpStatus.NOT_FOUND);
        }

        return taskSubmission;
    }


    async deleteTaskSubmissionById(id: number): Promise<void> {
        const taskSubmission = await this.taskSubmissionRepository.findOne({
            where: { id },
            relations: ['fieldValues'],
        });

        if (!taskSubmission) {
            throw new HttpException('ماموریت  پیدا نشد!', HttpStatus.NOT_FOUND);
        }

        if (taskSubmission.fieldValues && taskSubmission.fieldValues.length > 0) {
            await this.taskFieldValueRepository.remove(taskSubmission.fieldValues);
        }


        await this.taskSubmissionRepository.delete(id);
    }
}
