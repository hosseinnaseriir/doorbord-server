
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { TaskSubmissionStatus } from "src/common/enums";



export class TaskSubmissionDto {
    @IsNotEmpty()
    @IsString()
    readonly status: TaskSubmissionStatus;

    @IsNotEmpty()
    readonly fields: {
        fieldId: number;
        value: string;
    }[];
}

