import { Module } from '@nestjs/common';
import { OrderDetailController } from './orderDetail.controller';
import { OrderDetailService } from './orderDetail.service';

@Module({
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
