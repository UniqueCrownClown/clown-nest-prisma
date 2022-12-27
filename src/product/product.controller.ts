import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('getProduct')
  @ApiOperation({ summary: '获取product', description: '获取product' })
  getProduct() {
    return this.productService.getProduct();
  }

  @Post('addProduct')
  @ApiOperation({ summary: '新增product', description: '新增product' })
  @ApiBody({ description: '参数可选', type: ProductDto })
  addProduct(@Body() dto: ProductDto) {
    return this.productService.addProduct(dto);
  }

  @Delete('delProduct/:id')
  @ApiOperation({ summary: '删除product', description: '删除product' })
  deleteProduct(@Param('id') id: string) {
    return this.productService.delProduct(id);
  }

  @Put('updateProduct/:id')
  @ApiOperation({ summary: '修改product', description: '修改product' })
  updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.updateProduct(id, dto);
  }
}
