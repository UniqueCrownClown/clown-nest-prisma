import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  @ApiProperty({ description: '姓名', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '联系电话',
    example: '123-456-78',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  telphone: string;

  @ApiProperty({ description: '国家', required: true })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: '省份', required: true })
  @IsString()
  @IsNotEmpty()
  province: string;

  @ApiProperty({ description: '城市', required: true })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: '地区', required: true })
  @IsString()
  @IsNotEmpty()
  area: string;

  @ApiProperty({ description: '街道', required: true })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ description: '邮政编码', required: true })
  @IsString()
  @IsNotEmpty()
  zip: string;

  @ApiProperty({ description: '是否默认地址', required: true })
  @IsString()
  @IsNotEmpty()
  isDefault: number;
}
