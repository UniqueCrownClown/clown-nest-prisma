import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { OrderDetailModule } from './orderDetail/orderDetail.module';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { UserResolver } from './user/user.resolver';
import { PostResolver } from './post/post.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      // playground: false,
      autoSchemaFile: join(process.cwd(), 'schema/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      // sortSchema: true,
    }),
    AuthModule,
    UserModule,
    PostModule,
    PrismaModule,
    AddressModule,
    OrderDetailModule,
    OrderModule,
    ProductModule,
  ],
  controllers: [],
  providers: [PrismaService, UserResolver, PostResolver],
})
export class AppModule {}
