import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @ApiProperty({ description: '商品总价', required: true })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
