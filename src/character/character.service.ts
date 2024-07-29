import { Injectable } from '@nestjs/common';
import { RedisService } from '../service/redis.service';

@Injectable()
export class CharacterService {
  constructor(private readonly redisService: RedisService) {
  }

  async setCharacter(userId: string, char: string): Promise<void> {
    await this.redisService.setCharacter(userId, char);
  }

  async getCharacter(userId: string): Promise<string> {
    return this.redisService.getCharacter(userId);
  }
}
