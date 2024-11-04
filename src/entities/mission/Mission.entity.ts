import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user';
import { TaskSubmission } from '../task';

@Entity('missions')
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, { cascade: ['insert', 'update'], onDelete: 'NO ACTION' })
  @JoinTable()
  technicians: User[];

  @Column({ nullable: true })
  additionalTechnicianUsername?: string;

  @Column()
  missionDateTime: Date;

  @OneToOne(() => TaskSubmission, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  taskSubmission?: TaskSubmission;
  
  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
