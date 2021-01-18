import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength
} from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(48)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}