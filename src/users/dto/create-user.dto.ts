import { IsBoolean, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  family: string;
  
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsBoolean()
  isActive: boolean;
}
