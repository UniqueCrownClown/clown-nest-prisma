import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;
}
export class logInDto extends PickType(AuthDto, [
  'email',
  'password',
] as const) {}
