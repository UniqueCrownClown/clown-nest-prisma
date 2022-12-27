import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddressDto } from './dto/address.dto';
import { AddressService } from './address.service';

@Controller('address')
@ApiTags('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('getAddress')
  @ApiOperation({ summary: '获取address', description: '获取address' })
  getAddress() {
    return this.addressService.getAddress();
  }

  @Post('addAddress')
  @ApiOperation({ summary: '新增address', description: '新增address' })
  @ApiBody({ description: '参数可选', type: AddressDto })
  addAddress(@Body() dto: AddressDto) {
    return this.addressService.addAddress(dto);
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
