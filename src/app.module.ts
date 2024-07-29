import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RateLimiterMiddleware } from './middleware/rate-limiter.middleware';
import { RedisModule } from './infrastructure/redis/redis.module';
import { CharacterModule } from './character/character.module';
import { NumberModule } from './number/number.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [RedisModule, CharacterModule, NumberModule, ResultModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimiterMiddleware)
      .forRoutes('*');
  }
}
