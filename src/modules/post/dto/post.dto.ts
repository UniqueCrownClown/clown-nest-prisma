import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostDto {
  @ApiProperty({ description: '标题', required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '正文', example: '12345678', required: true })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: '是否展示', example: false, required: true })
  @IsBoolean()
  @IsNotEmpty()
  published: boolean;

  @ApiProperty({ description: '统计', example: 0, required: true })
  @IsNumber()
  @IsNotEmpty()
  viewCount: number;


}
