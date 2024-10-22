import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { TaskPermission } from './TaskPermission.entity';
import { TaskCategory } from './TaskCategory.entity';
import { TaskFieldType } from './TaskFieldType.entity';
import { Task } from './Task.entity';
import { TaskFieldOption } from './TaskFieldOption.entity';


@Entity()
export class TaskField {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    title: string;

    @ManyToOne(() => TaskFieldType)
    type: TaskFieldType;  // Reference to TaskFieldType entity

    @Column()
    required: boolean;

    @OneToMany(() => TaskFieldOption, (taskFieldOption) => taskFieldOption.field, { cascade: true })
    options: TaskFieldOption[];
}
