import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  async getAddress(user: ExpressUser) {
    try {
      let result = [];
      if (user?.id && !user.isAdmin) {
        result = await this.prisma.address.findMany({
          where: {
            userId: user.id,
          },
        });
        return result;
      }
      result = await this.prisma.address.findMany();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async addAddress(dto: AddressDto, user: ExpressUser) {
    try {
      const post = await this.prisma.address.create({
        data: {
          name: dto.name,
          telphone: dto.telphone,
          country: dto.country,
          province: dto.province,
          city: dto.city,
          area: dto.area,
          street: dto.street,
          detail: dto.detail,
          zip: dto.zip,
          isDefault: dto.isDefault,
          userId: user.id,
        },
      });
      return post;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw error;
      }
    }
  }

  async delAddress(id: string) {
    try {
      const postone = await this.prisma.address.findFirst({
        where: { id: parseInt(id) },
      });
      if (postone) {
        const result = await this.prisma.address.delete({
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

  async updateAddress(id: string, dto: AddressDto) {
    try {
      const result = await this.prisma.address.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: dto.name,
          telphone: dto.telphone,
          country: dto.country,
          province: dto.province,
          city: dto.city,
          area: dto.area,
          street: dto.street,
          detail: dto.detail,
          zip: dto.zip,
          isDefault: dto.isDefault,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
