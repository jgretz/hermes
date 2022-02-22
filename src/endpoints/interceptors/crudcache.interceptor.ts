import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Cache} from 'cache-manager';
import {tap} from 'rxjs/operators';

@Injectable()
export class CrudCacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.getArgByIndex(0) as Request;
    if (request.method !== 'GET') {
      return next.handle();
    }

    console.log(request.url);

    return next.handle();

    // const now = Date.now();
    // return next
    //   .handle()
    //   .pipe(
    //     tap(() => console.log(`After... ${Date.now() - now}ms`)),
    //   );
  }
}
