
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { TaskFieldType } from "./TaskFieldType.entity";
import { TaskFieldOption } from "./TaskFieldOption.entity";



export class CreateTaskFieldDto {
    @IsNotEmpty()
    @IsString()
    readonly key: string;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    readonly type: TaskFieldType;

    @IsBoolean()
    readonly required: boolean;

    @IsNotEmpty()
    readonly options: TaskFieldOption[];
}

