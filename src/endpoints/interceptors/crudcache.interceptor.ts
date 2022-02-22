import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import {of} from 'rxjs';
import {Cache} from 'cache-manager';
import {tap} from 'rxjs/operators';

const CACHE_TTL = JSON.parse(process.env.CACHE_TTL);

const valueFromCache = async (url: string, cacheManager: Cache) => {
  return await cacheManager.get(url);
};

const cacheValue = (url: string, cacheManager: Cache, value: unknown) => {
  const [request] = url.split('?');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_s, controller, resource, doc] = request.split('/');

  if (controller !== 'crud') {
    return;
  }

  const ttl = CACHE_TTL[`${resource}_${doc}`] || CACHE_TTL[`${resource}`];
  if (!ttl) {
    return;
  }

  cacheManager.set(url, value, {ttl});
};

@Injectable()
export class CrudCacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    if (request.method !== 'GET') {
      return next.handle();
    }

    const cachedValue = await valueFromCache(request.url, this.cacheManager);
    if (cachedValue !== undefined) {
      return of(cachedValue);
    }

    return next.handle().pipe(tap((value) => cacheValue(request.url, this.cacheManager, value)));
  }
}
