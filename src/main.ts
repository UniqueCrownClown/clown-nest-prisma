import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  const options = new DocumentBuilder()
    .setTitle('clown-nest-prisma')
    .setDescription('clown-nest-prisma API description')
    .setVersion('1.0')
    .addTag('nest-swagger')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(5000);
}
bootstrap();
