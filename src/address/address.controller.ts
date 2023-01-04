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
import { AddressDto } from './dto/address.dto';
import { AddressService } from './address.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('address')
@ApiTags('地址管理')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @UseGuards(JwtGuard)
  @Get('getAddress')
  @ApiOperation({ summary: '获取address', description: '获取address' })
  @ApiBearerAuth('defaultBearerAuth')
  getAddress(@GetUser() user: ExpressUser) {
    return this.addressService.getAddress(user);
  }

  @UseGuards(JwtGuard)
  @Post('addAddress')
  @ApiOperation({ summary: '新增address', description: '新增address' })
  @ApiBody({ description: '参数可选', type: AddressDto })
  @ApiBearerAuth('defaultBearerAuth')
  addAddress(@Body() dto: AddressDto, @GetUser() user: ExpressUser) {
    return this.addressService.addAddress(dto, user);
  }

  @Delete('delAddress/:id')
  @ApiOperation({ summary: '删除address', description: '删除address' })
  deleteAddress(@Param('id') id: string) {
    return this.addressService.delAddress(id);
  }

  @Put('updateAddress/:id')
  @ApiOperation({ summary: '修改address', description: '修改address' })
  updateAddress(@Param('id') id: string, @Body() dto: AddressDto) {
    return this.addressService.updateAddress(id, dto);
  }
}
