import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
HttpStatus,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if( (context as any).contextType === 'graphql'){
      return next.handle()
    }
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: HttpStatus.OK,
          message: '请求成功',
        };
      }),
    );
  }
}
