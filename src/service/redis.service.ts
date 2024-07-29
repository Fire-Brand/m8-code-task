import { Inject, Injectable } from '@nestjs/common';
import { RedisRepository } from '../infrastructure/redis/repository/redis.repository';

@Injectable()
export class RedisService {
    constructor(@Inject(RedisRepository) private readonly redisRepository: RedisRepository) {}

    async setCharacter(userId: string, character: string): Promise<void>{
        await this.redisRepository.set(userId, 'char', character)
    } 

    async getCharacter(userId:string): Promise<string>{
        return await this.redisRepository.get(userId, 'char')
    }

    async setNumber(userId: string, num: number): Promise<void> {
        await this.redisRepository.set(userId, 'num', num.toString());
      }
    
      async getNumber(userId: string): Promise<number> {
        const num = await this.redisRepository.get(userId, 'num');
        return Number(num);
      }
}
