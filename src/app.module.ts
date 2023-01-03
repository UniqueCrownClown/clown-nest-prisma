import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { OrderDetailModule } from './orderDetail/orderDetail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PostModule,
    PrismaModule,
    AddressModule,
    OrderDetailModule,
    OrderModule,
    ProductModule
  ],
})
export class AppModule {}
