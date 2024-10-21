import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TaskPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;  // "SALES", "ADMIN", "TECH"
}
