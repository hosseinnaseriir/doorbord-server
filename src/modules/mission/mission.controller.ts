import { Controller, Post, Body, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { MissionService } from './mission.service';
import { CreateMissionDto } from 'src/entities';
import { Role } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums';

@Controller('mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) { }


  @Role(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.SUPERVISOR)
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createMission(@Body() createMissionDto: CreateMissionDto) {
    return this.missionService.createMission(createMissionDto);
  }
}
