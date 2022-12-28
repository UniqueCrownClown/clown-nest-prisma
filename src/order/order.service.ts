import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AddressController } from 'src/address/address.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async getOrder() {
    try {
      const result = await this.prisma.order.findMany();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async addOrder(dto: OrderDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          name: 'clown',
        },
      });
      const address = await this.prisma.address.findFirst({
        where: {
          id: '1',
        },
      });
      const post = await this.prisma.order.create({
        data: {
          amount: dto.amount,
          description: dto.descrption,
          userId: user.id,
          addressId: address.id,
        },
      });
      return post;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw error;
      }
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
          description: dto.descrption,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
