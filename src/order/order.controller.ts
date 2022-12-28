import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('getOrder')
  @ApiOperation({ summary: '获取order', description: '获取order' })
  getOrder() {
    return this.orderService.getOrder();
  }

  @Post('addOrder')
  @ApiOperation({ summary: '新增order', description: '新增order' })
  @ApiBody({ description: '参数可选', type: OrderDto })
  addOrder(@Body() dto: OrderDto) {
    return this.orderService.addOrder(dto);
  }

  @Delete('delOrder/:ids')
  @ApiOperation({ summary: '删除order', description: '删除order' })
  deleteOrder(@Param('id') ids: string) {
    return this.orderService.delOrder(ids);
  }

  @Put('updateOrder/:id')
  @ApiOperation({ summary: '修改order', description: '修改order' })
  updateOrder(@Param('id') id: string, @Body() dto: OrderDto) {
    return this.orderService.updateOrder(id, dto);
  }
}
