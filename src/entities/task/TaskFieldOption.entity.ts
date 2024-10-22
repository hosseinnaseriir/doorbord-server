import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskField } from "./TaskField.entity";

@Entity()
export class TaskFieldOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    value: string;

    @ManyToOne(() => TaskField, (taskField) => taskField.options)
    field: TaskField;
}
