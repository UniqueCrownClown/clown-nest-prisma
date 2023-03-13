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
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConsumerController } from 'src/microservice/consumer.controller';
import { AppService } from 'src/microservice/app.service';
import { AppController } from 'src/microservice/app.controller';

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
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.TCP,
        options: { port: 5001 },
      },
    ]),
    AuthModule,
    UserModule,
    PostModule,
    PrismaModule,
    AddressModule,
    OrderDetailModule,
    OrderModule,
    ProductModule,
  ],
  controllers: [AppController, ConsumerController],
  providers: [PrismaService, UserResolver, PostResolver, AppService],
})
export class AppModule {}
