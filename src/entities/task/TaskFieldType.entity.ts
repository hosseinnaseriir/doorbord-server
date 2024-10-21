import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class TaskFieldType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;  // "CHOOSE", "SIMPLE", "TECH", "DATE"
}
