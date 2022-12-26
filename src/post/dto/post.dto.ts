import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
  @ApiProperty({ description: '标题', required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '正文', example: '12345678', required: true })
  @IsString()
  @IsNotEmpty()
  content: string;
}
