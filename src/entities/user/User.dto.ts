import { IsNotEmpty, IsString, Length, Matches } from "class-validator";


export class CreateUserPayload {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  role: string;
}


export class ValidateUserPayload {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

