import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
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
      const post = await this.prisma.order.create({
        data: {
          amount: dto.amount,
          authorId: user.id,
        },
      });
      return post;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw error;
      }
    }
  }

  async delOrder(id: string) {
    try {
      const postone = await this.prisma.order.findFirst({
        where: { id: parseInt(id) },
      });
      if (postone) {
        const result = await this.prisma.order.delete({
          where: {
            id: parseInt(id),
          },
        });
        return result;
      }
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
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
