import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMissionDto, Mission, User, TaskSubmission } from 'src/entities';
import { In, Repository } from 'typeorm';
import { TaskSubmissionStatus } from 'src/common/enums';

@Injectable()
export class MissionService {
  constructor(
    @InjectRepository(Mission)
    private missionRepository: Repository<Mission>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(TaskSubmission)
    private taskSubmissionRepository: Repository<TaskSubmission>,
  ) { }

  async createMission(createMissionDto: CreateMissionDto): Promise<Mission> {
    try {
      const { technicianIds, additionalTechnicianUsername, missionDateTime, description, submissionId } = createMissionDto;

      // Check if the provided submissionId corresponds to an existing mission
      const existingMission = await this.missionRepository.findOne({
        where: { taskSubmission: { id: Number(submissionId) } }, // Adjust this according to your relationship
      });

      if (existingMission) {
        throw new ConflictException('A mission with this submission ID already exists and is assigned to someone');
      }
      
      const technicians = await this.userRepository.findBy({ id: In(technicianIds) });
      if (technicians.length !== technicianIds.length) {
        throw new NotFoundException('One or more technician IDs not found');
      }

      let taskSubmission = null;
      if (submissionId) {
        taskSubmission = await this.taskSubmissionRepository.findOneBy({ id: Number(submissionId) });
        if (!taskSubmission) {
          throw new NotFoundException('TaskSubmission with the provided ID not found');
        }
        taskSubmission.status = TaskSubmissionStatus.ASSIGNED;
        await this.taskSubmissionRepository.save(taskSubmission);
      }

      const mission = this.missionRepository.create({
        technicians,
        additionalTechnicianUsername,
        missionDateTime: new Date(missionDateTime),
        description,
        taskSubmission,
      });
      return await this.missionRepository.save(mission);
    } catch (error) {
      throw error;
    }
  }
}
