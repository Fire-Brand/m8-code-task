import { Test, TestingModule } from '@nestjs/testing';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ResultController', () => {
  let controller: ResultController;
  let resultService: ResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultController],
      providers: [
        {
          provide: ResultService,
          useValue: {
            getResult: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ResultController>(ResultController);
    resultService = module.get<ResultService>(ResultService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return 400 when data is missing', async () => {
    const userId = 'testUser';

    jest.spyOn(resultService, 'getResult').mockRejectedValue(new Error('Data is missing'));

    try {
      await controller.getResult(userId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe('Data is missing');
    }
  });
});
