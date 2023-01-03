import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDetailDto {
  @ApiProperty({ description: '订单id', required: true })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({ description: '商品id', required: true })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ description: '订单总价', required: true })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: '订单描述' })
  @IsNumber()
  @IsNotEmpty()
  description?: string;
}
