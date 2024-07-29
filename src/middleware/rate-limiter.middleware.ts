import { Injectable, NestMiddleware, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisRepository } from '../infrastructure/redis/repository/redis.repository';


@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {

  constructor(@Inject(RedisRepository) private readonly redisRepository: RedisRepository) { }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const ip = req.ip;
      const requests = await this.redisRepository.incr('ip', ip);

      if (requests === 1) {
        await this.redisRepository.setWithExpiry('ip', ip, 60); // set the expiration time to 60 seconds
      }

      if (requests > 5) { // limit to 5 requests per minute
        throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS);
      }

      next();
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
