import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async getPost() {
    try {
      const result = await this.prisma.post.findMany({
        include: {
          author: true,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  async delPost(id: string) {
    try {
      const postone = await this.prisma.post.findFirst({
        where: { id: parseInt(id) },
      });
      if (postone) {
        const result = await this.prisma.post.delete({
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
  async addPost(dto: PostDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          name: 'clown',
        },
      });
      const post = await this.prisma.post.create({
        data: {
          title: dto.title,
          content: dto.content,
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

  async updatePost(id: string, dto: Partial<PostDto>) {
    try {
      const result = await this.prisma.post.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title: dto?.title,
          content: dto?.content,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
