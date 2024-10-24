import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Task } from './Task.entity';
import { TaskFieldValue } from './TaskFieldValue.entity';
import { TaskSubmissionStatus } from 'src/common/enums';



@Entity()
export class TaskSubmission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Task, task => task.submissions)
    task: Task;

    @Column()
    submittedAt: Date;

    @OneToMany(() => TaskFieldValue, taskFieldValue => taskFieldValue.submission, { cascade: true })
    fieldValues: TaskFieldValue[];

    @Column({
        type: 'varchar',
        length: 20,
        default: 'BACKLOG'
    })
    status: TaskSubmissionStatus;
}
