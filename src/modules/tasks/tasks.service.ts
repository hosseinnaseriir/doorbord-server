import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskSubmissionStatus } from 'src/common/enums';
import { CreateTaskDto, CreateTaskFieldDto, Task, TaskCategory, TaskField, TaskFieldOption, TaskFieldType, TaskPermission, TaskSubmissionDto } from 'src/entities';
import { TaskFieldValue } from 'src/entities/task/TaskFieldValue.entity';
import { TaskSubmission } from 'src/entities/task/TaskSubmission.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TasksService {
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

    // TASKS
    async getAllTasksService(): Promise<any> {
        const res = await this.taskRepository.find({
            relations: ['categories', 'fields', 'fields.type', 'fields.options', 'permissions'],
        })
        return res
    }

    async createNewTaskService(task: CreateTaskDto): Promise<Task> {
        const categories = await this.taskCategoryRepository.findBy({ id: In(task.categoryIds) });
        if (!categories) throw new HttpException('دسته بندی پیدا نشد!', HttpStatus.NOT_FOUND);

        const permissions = await this.taskPermissionRepository.findBy({ id: In(task.permissionIds) });
        if (permissions.length === 0) {
            throw new HttpException('هیچ دسترسی پیدا نشد!', HttpStatus.NOT_FOUND);
        }
        const fields = await this.taskFieldRepository.findBy({ id: In(task.fieldIds) });
        if (fields.length === 0) {
            throw new HttpException('هیچ فیلدی پیدا نشد!', HttpStatus.NOT_FOUND);
        }

        const newTask = this.taskRepository.create({
            title: task.title,
            key: task.key,
            categories,
            permissions,
            fields
        });

        await this.taskRepository.save(newTask);
        return newTask
    }

    async updateTaskService(taskId: number, taskData: CreateTaskDto): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: { id: taskId },
            relations: ['categories', 'fields', 'fields.type', 'fields.options', 'permissions'],
        });

        if (!task) {
            throw new HttpException('تسک پیدا نشد!', HttpStatus.NOT_FOUND);
        }

        let categories = task.categories;
        if (taskData.categoryIds && taskData.categoryIds.length > 0) {
            categories = await this.taskCategoryRepository.findBy({ id: In(taskData.categoryIds) });
            if (!categories) {
                throw new HttpException('دسته بندی پیدا نشد!', HttpStatus.NOT_FOUND);
            }
        }

        let permissions = task.permissions;
        if (taskData.permissionIds && taskData.permissionIds.length > 0) {
            permissions = await this.taskPermissionRepository.findBy({ id: In(taskData.permissionIds) });
            if (permissions.length === 0) {
                throw new HttpException('هیچ دسترسی پیدا نشد!', HttpStatus.NOT_FOUND);
            }
        }

        let fields = task.fields;
        if (taskData.fieldIds && taskData.fieldIds.length > 0) {
            fields = await this.taskFieldRepository.findBy({ id: In(taskData.fieldIds) });
            if (fields.length === 0) {
                throw new HttpException('هیچ فیلدی پیدا نشد!', HttpStatus.NOT_FOUND);
            }
        }

        task.title = taskData.title || task.title;
        task.key = taskData.key || task.key;
        task.categories = categories;
        task.permissions = permissions;
        task.fields = fields;

        await this.taskRepository.save(task);
        return task;
    }

    async destroyTaskService(taskId: string | number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id: +taskId } });

        if (!task) {
            throw new HttpException('ماموریت پیدا نشد!', HttpStatus.NOT_FOUND);
        }

        const removedTask = await this.taskRepository.remove(task);
        return removedTask;
    }

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

        await this.taskFieldRepository.remove(taskField);
    }

    // SUBMIT A TASK FORM
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