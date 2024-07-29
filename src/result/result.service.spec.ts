import { Test, TestingModule } from '@nestjs/testing';
import { ResultService } from './result.service';
import { CharacterService } from '../character/character.service';
import { NumberService } from '../number/number.service';

describe('ResultService', () => {
  let service: ResultService;
  let characterService: CharacterService;
  let numberService: NumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResultService,
        {
          provide: CharacterService,
          useValue: {
            getCharacter: jest.fn(),
          },
        },
        {
          provide: NumberService,
          useValue: {
            getNumber: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ResultService>(ResultService);
    characterService = module.get<CharacterService>(CharacterService);
    numberService = module.get<NumberService>(NumberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return result when both character and number are available', async () => {
    const userId = 'testUser';
    const char = 'A';
    const num = 123;

    jest.spyOn(characterService, 'getCharacter').mockResolvedValue(char);
    jest.spyOn(numberService, 'getNumber').mockResolvedValue(num);

    const result = await service.getResult(userId);
    expect(result).toEqual({ result: `${char}_${num}` });
  });

  it('should throw an error when character is missing', async () => {
    const userId = 'testUser';
    const num = 123;

    jest.spyOn(characterService, 'getCharacter').mockResolvedValue(null);
    jest.spyOn(numberService, 'getNumber').mockResolvedValue(num);

    await expect(service.getResult(userId)).rejects.toThrow('Data is missing');
  });

  it('should throw an error when number is missing', async () => {
    const userId = 'testUser';
    const char = 'A';

    jest.spyOn(characterService, 'getCharacter').mockResolvedValue(char);
    jest.spyOn(numberService, 'getNumber').mockResolvedValue(null);

    await expect(service.getResult(userId)).rejects.toThrow('Data is missing');
  });
});
