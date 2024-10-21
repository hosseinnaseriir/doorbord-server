import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto, Task, TaskCategory, TaskField, TaskFieldOption, TaskFieldType, TaskPermission } from 'src/entities';
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
    ) { }
    async getAllTasksService(): Promise<any> {
        const res = await this.taskRepository.find({
            relations: ['category', 'fields', 'fields.type', 'fields.options', 'permissions'],
        })
        return res
    }

    async createNewTaskService(task: CreateTaskDto): Promise<Task> {
        const category = await this.taskCategoryRepository.findOne({ where: { id: task.categoryId } });
        if (!category) throw new HttpException('دسته بندی پیدا نشد!', HttpStatus.NOT_FOUND);

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
            category,
            permissions,
            fields
        });

        await this.taskRepository.save(newTask);
        return newTask
    }

    async destroyTaskService(taskId: string | number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id: +taskId } });

        if (!task) {
            throw new HttpException('ماموریت پیدا نشد!', HttpStatus.NOT_FOUND);
        }

        const removedTask = await this.taskRepository.remove(task);
        return removedTask;
    }

}