import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;
}
export class logInDto extends PickType(AuthDto, [
  'email',
  'password',
  'name',
] as const) {}
