import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";


export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    readonly key: string;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsNumber()
    readonly categoryId: number;

    @IsNotEmpty()
    @IsNumber({}, { each: true })
    readonly permissionIds: number[];
    
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    readonly fieldIds: number[];
}

