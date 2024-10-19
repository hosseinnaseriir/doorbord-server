import { IsNotEmpty, IsString, Length } from "class-validator";


export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsString()
  readonly role: string;
}


export class ValidateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

