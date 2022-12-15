import { Controller, Get, HttpException } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Get('test')
  getme() {
    throw new HttpException('请求失败', 500);
  }
}
