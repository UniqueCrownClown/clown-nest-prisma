import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthDto } from 'src/modules/auth/dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import * as argon from 'argon2';
import { paginate, PaginateParams } from 'src/paginate/paginate';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  private authService: AuthService;
  async updateUser(id: string, dto: AuthDto, user: ExpressUser) {
    try {
      if (user.isAdmin) {
        const hash = await argon.hash(dto.password);
        const result = await this.prisma.user.update({
          where: {
            id: parseInt(id),
          },
          data: {
            name: dto.name,
            email: dto.email,
            hash,
            isAdmin: dto.isAdmin,
          },
        });
        return result;
      }
      return {};
    } catch (error) {
      throw error;
    }
  }
  async delUser(ids: string, user: ExpressUser) {
    const idsToDelete = ids.split(',').map((item) => parseInt(item));
    try {
      if (user.isAdmin) {
        const result = await this.prisma.user.deleteMany({
          where: {
            id: {
              in: idsToDelete,
            },
          },
        });
        return result;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }
  addUser(dto: AuthDto) {
    return this.authService.signUp(dto);
  }
  async getUser(user: ExpressUser, pageParams?: PaginateParams) {
    try {
      // 过滤密码
      if (user.isAdmin) {
        if (pageParams) {
          const result = await paginate<any>(pageParams, {
            prisma: this.prisma,
            model: 'user',
            filterFields: ['name'],
          });
          return result;
        }
        const result = await this.prisma.user.findMany();
        return result;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }
}
