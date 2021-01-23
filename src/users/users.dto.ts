import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength
} from "class-validator";
import { Unique } from "../decorators"

export class CreateUserDto {

  @Unique()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(48)
  username: string;

  @Unique()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  salt: string;
}

export class FindOneParamsDTO {
  @IsNumberString()
  id: number;
}