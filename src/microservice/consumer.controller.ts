import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class ConsumerController {
  constructor(
    private readonly appService: AppService,
    @Inject('MATH_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('testMicroservice')
  testMicroservice(): Observable<number> {
    return this.client.send('accumulate', [1, 2, 3, 4, 5]);
  }
}
