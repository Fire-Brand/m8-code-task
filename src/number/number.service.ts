import { Injectable } from '@nestjs/common';
import { RedisService } from '../service/redis.service';

@Injectable()
export class NumberService {
  constructor(private readonly redisService: RedisService) {
  }

  async setNumber(userId: string, num: number): Promise<void> {
    await this.redisService.setNumber(userId, num);
  }

  async getNumber(userId: string): Promise<number> {
    return this.redisService.getNumber(userId);
  }
}
