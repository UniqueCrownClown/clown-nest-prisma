import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDetailDto {
  @ApiProperty({ description: '订单id', required: true })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({ description: '商品id', required: true })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ description: '订单数量', required: true })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
