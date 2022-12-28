import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({ description: '商品名称', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '商品描述', required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: '商品图片', required: true })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: '库存', required: true })
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @ApiProperty({ description: '单价', required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
