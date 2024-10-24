import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskField } from './TaskField.entity';
import { TaskSubmission } from './TaskSubmission.entity';

@Entity()
export class TaskFieldValue {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TaskSubmission, submission => submission.fieldValues)
    submission: TaskSubmission;

    @ManyToOne(() => TaskField, taskField => taskField.key)
    field: TaskField;

    @Column()
    value: string;
}
