import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderDetailDto } from './dto/orderDetail.dto';
import { OrderDetailService } from './orderDetail.service';

@Controller('orderDetail')
@ApiTags('订单详情管理')
export class OrderDetailController {
  constructor(private orderDetailService: OrderDetailService) {}

  @Get('getOrderDetail/:orderId')
  @ApiOperation({ summary: '获取orderDetail', description: '获取orderDetail' })
  getOrder(@Param('orderId') orderId: string) {
    return this.orderDetailService.getOrderDetail(orderId);
  }

  @Post('addOrderDetail')
  @ApiOperation({ summary: '新增orderDetail', description: '新增orderDetail' })
  @ApiBody({ description: '参数可选', type: OrderDetailDto })
  addOrder(@Body() dto: OrderDetailDto[]) {
    return this.orderDetailService.addOrderDetail(dto);
  }

  @Delete('delOrderDetail/:ids')
  @ApiOperation({ summary: '删除orderDetail', description: '删除orderDetail' })
  deleteOrder(@Param('id') ids: string) {
    return this.orderDetailService.delOrderDetail(ids);
  }

  @Put('updateOrderDetail/:id')
  @ApiOperation({ summary: '修改orderDetail', description: '修改orderDetail' })
  updateOrder(@Param('id') id: string, @Body() dto: OrderDetailDto) {
    return this.orderDetailService.updateOrderDetail(id, dto);
  }
}
