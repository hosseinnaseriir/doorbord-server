import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class TaskCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;  // "SUBSCRIBER", "SITE"
}
