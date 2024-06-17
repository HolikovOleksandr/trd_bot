import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(28)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(34)
  lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
