import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderDetailDto } from 'src/orderDetail/dto/orderDetail.dto';

export class OrderDto {
  @ApiProperty({ description: '订单总价', required: true })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: '订单描述' })
  @IsNumber()
  @IsNotEmpty()
  descrption?: string;

  @ApiProperty({ description: '订单地址' })
  @IsNumber()
  @IsNotEmpty()
  addressId?: string;

  @ApiProperty({ description: '订单详情' })
  @IsArray()
  @IsNotEmpty()
  orderDetail?: OrderDetailDto[];
}
