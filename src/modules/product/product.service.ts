import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProduct() {
    try {
      const result = await this.prisma.product.findMany();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: string, dto: ProductDto) {
    try {
      const result = await this.prisma.product.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: dto.name,
          description: dto.description,
          image: dto.image,
          count: dto.count,
          price: dto.price,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delProduct(ids: string) {
    const idsToDelete = ids.split(',').map((item) => parseInt(item));
    try {
      const result = await this.prisma.product.deleteMany({
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

  async addProduct(dto: ProductDto) {
    try {
      const post = await this.prisma.product.create({
        data: {
          name: dto.name,
          description: dto.description,
          image: dto.image,
          count: dto.count,
          price: dto.price,
        },
      });
      return post;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw error;
      }
    }
  }
}
