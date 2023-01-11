import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDetailDto } from './dto/orderDetail.dto';

@Injectable()
export class OrderDetailService {
  constructor(private prisma: PrismaService) {}

  async getOrderDetail(orderId: string) {
    try {
      const result = await this.prisma.orderDetail.findMany({
        where: {
          orderId: parseInt(orderId),
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async addOrderDetail(dto: OrderDetailDto[]) {
    const orderArr = dto.map((item) => ({
      order: {
        connect: { id: item.orderId },
      },
      product: {
        connect: { id: item.productId },
      },
      count: item.count,
    }));
    return Promise.all(
      orderArr.map(
        (item) =>
          new Promise(async (resolve) => {
            // 需要findFirst处理??
            const result = await this.prisma.orderDetail.create({
              data: item,
            });
            resolve(result);
          }),
      ),
    );
    // 有外键约束不能用createMany
    // try {
    //   const result = await this.prisma.orderDetail.createMany({
    //     data: orderArr,
    //   });
    //   return result;
    // } catch (error) {
    //   throw error;
    // }
  }

  async delOrderDetail(ids: string) {
    const idsToDelete = ids.split(',').map((item) => parseInt(item));
    try {
      const result = await this.prisma.orderDetail.deleteMany({
        where: {
          id: {
            in: idsToDelete,
          },
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderDetail(id: string, dto: OrderDetailDto) {
    try {
      const result = await this.prisma.orderDetail.update({
        where: {
          id: parseInt(id),
        },
        data: {
          count: dto.count,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
