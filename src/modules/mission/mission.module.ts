import { Module } from '@nestjs/common';
import { MissionController } from './mission.controller';
import { MissionService } from './mission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission, TaskSubmission, User } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Mission, TaskSubmission]),
  ],
  controllers: [MissionController],
  providers: [MissionService]
})
export class MissionModule { }
