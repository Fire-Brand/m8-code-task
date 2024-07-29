import { Test, TestingModule } from '@nestjs/testing';
import { NumberService } from './number.service';
import { RedisService } from '../service/redis.service';


describe('NumberService', () => {
  let service: NumberService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NumberService,
        {
          provide: RedisService,
          useValue: {
            setNumber: jest.fn(),
            getNumber: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NumberService>(NumberService);
    redisService = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should set a number', async () => {
    const userId = 'testUser';
    const num = 123;
    await service.setNumber(userId, num);
    expect(redisService.setNumber).toHaveBeenCalledWith(userId, num);
  });

  it('should get a number', async () => {
    const userId = 'testUser';
    const num = 123;
    jest.spyOn(redisService, 'getNumber').mockResolvedValue(num);
    const result = await service.getNumber(userId);
    expect(result).toBe(num);
  });
});
