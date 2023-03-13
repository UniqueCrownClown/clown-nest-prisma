import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Transport } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @MessagePattern('accumulate',Transport.TCP)
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }
}
