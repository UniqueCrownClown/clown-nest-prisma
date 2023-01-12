import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/modules/auth/decorator';
import { JwtGuard } from 'src/modules/auth/guard';
import { Paginate, PaginateParams } from 'src/paginate/paginate';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('订单管理')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtGuard)
  @Get('getOrder')
  @ApiOperation({ summary: '获取order', description: '获取order' })
  @ApiBearerAuth('defaultBearerAuth')
  getOrder(@GetUser() user: ExpressUser) {
    return this.orderService.getOrder(user);
  }

  @Get('getAll')
  @ApiOperation({
    summary: '分页获取order',
    description: '分页获取获取order',
    parameters: [
      { name: 'page', in: 'query' },
      { name: 'limit', in: 'query' },
    ],
  })
  getAll(@Paginate() pageParams: PaginateParams) {
    return this.orderService.getAll(pageParams);
  }

  @UseGuards(JwtGuard)
  @Post('addOrder')
  @ApiOperation({ summary: '新增order', description: '新增order' })
  @ApiBody({ description: '参数可选', type: OrderDto })
  @ApiBearerAuth('defaultBearerAuth')
  addOrder(@Body() dto: OrderDto, @GetUser() user: ExpressUser) {
    return this.orderService.addOrder(dto, user);
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
