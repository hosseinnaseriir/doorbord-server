import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { TaskPermission } from './TaskPermission.entity';
import { TaskCategory } from './TaskCategory.entity';
import { TaskField } from './TaskField.entity';


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    title: string;

    @ManyToMany(() => TaskCategory)
    @JoinTable()
    categories: TaskCategory[];  

    @ManyToMany(() => TaskPermission)
    @JoinTable()
    permissions: TaskPermission[];

    @ManyToMany(() => TaskField)
    @JoinTable()
    fields: TaskField[];
}
