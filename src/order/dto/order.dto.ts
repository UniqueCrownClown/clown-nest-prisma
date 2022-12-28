import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @ApiProperty({ description: '订单总价', required: true })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: '订单描述' })
  @IsNumber()
  @IsNotEmpty()
  descrption?: string;
}
