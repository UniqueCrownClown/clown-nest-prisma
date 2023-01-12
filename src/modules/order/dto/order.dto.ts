import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderDetailDto } from 'src/modules/orderDetail/dto/orderDetail.dto';

export interface ORDERSTATUS {
  UNPAID: 'UNPAID';
  PAID: 'PAID';
  FINISHED: 'FINISHED';
}
export class OrderDto {
  @ApiProperty({ description: '订单总价', required: true })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: '订单描述' })
  @IsNumber()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({ description: '订单状态' })
  @IsNotEmpty()
  status?: keyof ORDERSTATUS;

  @ApiProperty({ description: '订单地址' })
  @IsNumber()
  @IsNotEmpty()
  addressId?: string;

  @ApiProperty({ description: '订单详情' })
  @IsArray()
  @IsNotEmpty()
  detail?: Pick<OrderDetailDto, 'productId' | 'count'>[];
}
