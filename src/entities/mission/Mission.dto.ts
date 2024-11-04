import { IsArray, IsOptional, IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateMissionDto {
  @IsArray()
  @IsNotEmpty({ each: true })
  technicianIds: number[];

  @IsString()
  @IsOptional()
  additionalTechnicianUsername?: string;

  @IsDateString()
  missionDateTime: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  submissionId?: string;
}
