import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(private postService: PostService) {}

  // @Get('')
  // getme() {
  //   throw new HttpException('请求失败', 500);
  // }

  @Get('getPost')
  @ApiOperation({ summary: '获取post', description: '获取post' })
  getPost() {
    return this.postService.getPost();
  }

  @Post('addPost')
  @ApiOperation({ summary: '新增post', description: '新增post' })
  @ApiBody({ description: '参数可选', type: PostDto })
  addPost(@Body() dto: PostDto) {
    return this.postService.addPost(dto);
  }

  @Delete('delPost/:id')
  @ApiOperation({ summary: '删除post', description: '删除post' })
  deletePost(@Param('id') id: string) {
    return this.postService.delPost(id);
  }

  @Put('updatePost/:id')
  @ApiOperation({ summary: '修改post', description: '修改post' })
  updatePost(@Param('id') id: string, @Body() dto: PostDto) {
    return this.postService.updatePost(id, dto);
  }
}
