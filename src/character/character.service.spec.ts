import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { RedisService } from '../service/redis.service';

describe('CharacterService', () => {
  let service: CharacterService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: RedisService,
          useValue: {
            setCharacter: jest.fn(),
            getCharacter: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
    redisService = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should set a character', async () => {
    const userId = 'testUser';
    const char = 'A';
    await service.setCharacter(userId, char);
    expect(redisService.setCharacter).toHaveBeenCalledWith(userId, char);
  });

  it('should get a character', async () => {
    const userId = 'testUser';
    const char = 'A';
    jest.spyOn(redisService, 'getCharacter').mockResolvedValue(char);
    const result = await service.getCharacter(userId);
    expect(result).toBe(char);
  });
});
