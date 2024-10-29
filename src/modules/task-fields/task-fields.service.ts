import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateTaskFieldDto, Task, TaskField, TaskFieldOption, TaskFieldType } from 'src/entities';

@Injectable()
export class TaskFieldsService {
    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>,
        @InjectRepository(TaskField) private readonly taskFieldRepository: Repository<TaskField>,
        @InjectRepository(TaskFieldOption) private readonly taskFieldOptionRepository: Repository<TaskFieldOption>,
        @InjectRepository(TaskFieldType) private readonly taskFieldTypeRepository: Repository<TaskFieldType>,
    ) { }

    // TASK FIELDS
    async getTaskFieldsByTaskId(taskId: number): Promise<any> {
        const task = await this.taskRepository.findOne({
            where: { id: taskId },
            relations: ['fields', 'fields.type', 'fields.options'],
        });

        if (!task) {
            throw new HttpException('تسکی پیدا نشد!', HttpStatus.NOT_FOUND);
        }

        return { task };
    }

    async getAllTaskFieldsService(): Promise<any> {
        const res = await this.taskFieldRepository.find({
            relations: ['type', 'options'],
        })
        return res
    }

    async createNewTaskFieldService(taskFieldDto: CreateTaskFieldDto): Promise<TaskField> {
        const taskFieldType = await this.taskFieldTypeRepository.findOne({ where: { id: taskFieldDto.type } });
        if (!taskFieldType) {
            throw new HttpException('نوع فیلد پیدا نشد!', HttpStatus.NOT_FOUND);
        }

        const taskFieldOptions = [];
        for (const option of taskFieldDto.options) {
            const taskFieldOption = this.taskFieldOptionRepository.create({
                title: option.title,
                value: option.value
            });
            taskFieldOptions.push(taskFieldOption);
        }

        const newTaskField = this.taskFieldRepository.create({
            key: taskFieldDto.key,
            title: taskFieldDto.title,
            type: taskFieldType,
            required: taskFieldDto.required,
            options: taskFieldOptions,
        });

        // Save the new task field and cascade the options
        await this.taskFieldRepository.save(newTaskField);

        return newTaskField;
    }

    async updateTaskFieldService(taskFieldId: number, taskFieldDto: CreateTaskFieldDto): Promise<TaskField> {
        const taskField = await this.taskFieldRepository.findOne({
            where: { id: taskFieldId },
            relations: ['type', 'options'],
        });

        if (!taskField) {
            throw new HttpException('فیلد پیدا نشد!', HttpStatus.NOT_FOUND);
        }

        taskField.key = taskFieldDto.key || taskField.key;
        taskField.title = taskFieldDto.title || taskField.title;
        taskField.required = taskFieldDto.required ?? taskField.required;

        if (taskFieldDto.type && taskFieldDto.type !== taskField.type.id) {
            const taskFieldType = await this.taskFieldTypeRepository.findOne({ where: { id: taskFieldDto.type } });
            if (!taskFieldType) {
                throw new HttpException('نوع فیلد پیدا نشد!', HttpStatus.NOT_FOUND);
            }
            taskField.type = taskFieldType;
        }

        const existingOptions = taskField.options;
        const updatedOptions = taskFieldDto.options;

        const taskFieldOptions = [];
        for (const optionDto of updatedOptions) {
            let option = existingOptions.find((opt) => opt.id === optionDto.id);

            if (!option) {
                option = this.taskFieldOptionRepository.create({
                    title: optionDto.title,
                    value: optionDto.value,
                    field: taskField,
                });
            } else {
                option.title = optionDto.title;
                option.value = optionDto.value;
            }
            taskFieldOptions.push(option);
        }

        const optionsToRemove = existingOptions.filter((opt) => !updatedOptions.some((optionDto) => optionDto.id === opt.id));
        if (optionsToRemove.length > 0) {
            await this.taskFieldOptionRepository.remove(optionsToRemove);
        }

        taskField.options = taskFieldOptions;

        await this.taskFieldRepository.save(taskField);
        return taskField;
    }

    async deleteTaskFieldService(taskFieldId: number): Promise<void> {
        const taskField = await this.taskFieldRepository.findOne({
            where: { id: taskFieldId },
            relations: ['options'],
        });

        if (!taskField) {
            throw new HttpException('فیلد پیدا نشد!', HttpStatus.NOT_FOUND);
        }

        if (taskField.options && taskField.options.length > 0) {
            await this.taskFieldOptionRepository.remove(taskField.options);
        }
        
        await this.taskFieldRepository.remove(taskField);
    }


}
