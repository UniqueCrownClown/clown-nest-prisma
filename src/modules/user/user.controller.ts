import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/modules/auth/decorator';
import { AuthDto } from 'src/modules/auth/dto';
import { JwtGuard } from 'src/modules/auth/guard';
import { Paginate, PaginateParams } from 'src/paginate/paginate';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('用户管理')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuard)
  @Get('getUser')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({ summary: '获取user', description: '获取user' })
  getUser(@GetUser() user: ExpressUser) {
    return this.userService.getUser(user);
  }

  @UseGuards(JwtGuard)
  @Get('getAll')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({ summary: '获取user', description: '获取user' })
  getAll(@GetUser() user: ExpressUser,@Paginate() pageParams: PaginateParams) {
    return this.userService.getUser(user,pageParams);
  }

  @Post('addUser')
  @ApiOperation({ summary: '新增user', description: '新增user' })
  @ApiBody({ description: '参数可选', type: AuthDto })
  addUser(@Body() dto: AuthDto) {
    return this.userService.addUser(dto);
  }

  @Delete('delUser/:ids')
  @ApiOperation({ summary: '删除user', description: '删除user' })
  deleteUser(@Param('ids') ids: string, @GetUser() user: ExpressUser) {
    // 是否管理员要不要封到装饰器里面？？？
    return this.userService.delUser(ids, user);
  }

  @Put('updateUser/:id')
  @ApiOperation({ summary: '修改user', description: '修改user' })
  updateUser(
    @Param('id') id: string,
    @Body() dto: AuthDto,
    @GetUser() user: ExpressUser,
  ) {
    return this.userService.updateUser(id, dto, user);
  }
}
