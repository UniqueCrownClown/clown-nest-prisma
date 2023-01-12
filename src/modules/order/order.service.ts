import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { OrderDetailService } from 'src/modules/orderDetail/orderDetail.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { paginate, PaginateParams } from 'src/paginate/paginate';
import { OrderDto, ORDERSTATUS } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  private orderDetail: OrderDetailService;
  async getOrder(user: ExpressUser) {
    try {
      let result = [];
      if (user?.id && !user.isAdmin) {
        result = await this.prisma.order.findMany({
          where: {
            userId: user.id,
          },
        });
        return result;
      }
      result = await this.prisma.order.findMany();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll(pageParams: PaginateParams) {
    const options = {
      prisma: this.prisma,
      model: 'order',
    };
    try {
      const result = await paginate(pageParams, options);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async addOrder(dto: OrderDto, user: ExpressUser) {
    try {
      if (user.id) {
        const post = await this.prisma.order.create({
          data: {
            amount: dto.amount,
            description: dto.description,
            status: 'UNPAID',
            address: {
              connect: { id: parseInt(dto.addressId) },
            },
            user: {
              connect: { id: user.id },
            },
            OrderDetail: {
              create: dto.detail,
            },
          },
        });
        return post;
        // 关联添加orderDetail
        // if (dto?.detail) {
        //   const orderDetails = dto.detail.map((item) => ({
        //     ...item,
        //     orderId: post.data.id,
        //   }));
        //   const orderRes = await this.orderDetail.addOrderDetail(orderDetails);
        // }
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw error;
      }
      throw error;
    }
  }

  async delOrder(ids: string) {
    const idsToDelete = ids.split(',').map((item) => parseInt(item));
    try {
      const result = await this.prisma.order.deleteMany({
        where: {
          id: {
            in: idsToDelete,
          },
        },
      });
      // 关联删除orderDetail
      await Promise.allSettled(
        idsToDelete.map(
          (item) =>
            new Promise(async (resolve) => {
              const orderRes = await this.orderDetail.getOrderDetail(
                item.toString(),
              );
              const result = await this.orderDetail.delOrderDetail(
                orderRes.join(','),
              );
              resolve(result);
            }),
        ),
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(id: string, dto: OrderDto) {
    try {
      const result = await this.prisma.order.update({
        where: {
          id: parseInt(id),
        },
        data: {
          amount: dto.amount,
          description: dto.description,
          status: dto.status,
          address: {
            connect: { id: parseInt(dto.addressId) },
          },
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
