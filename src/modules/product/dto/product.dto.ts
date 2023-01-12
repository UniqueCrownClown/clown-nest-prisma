import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({ description: '商品名称', example: '棒棒糖', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '商品描述',
    example: '好吃的棒棒糖',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: '商品图片',
    example:
      'https://www.xdsucai.cn/wp-content/uploads/2021/01/1610431690-e5a15b51be1b488.png',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: '库存', example: 100, required: true })
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @ApiProperty({ description: '单价', example: 10, required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
