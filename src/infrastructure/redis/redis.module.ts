import { Global, Module } from '@nestjs/common';

import { RedisService } from '../../service/redis.service';
import { redisClientFactory } from './redis.client.factory';
import { RedisRepository } from './repository/redis.repository';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [],
    providers: [redisClientFactory, RedisRepository, RedisService],

    exports: [RedisService, RedisRepository],
})
export class RedisModule {}
