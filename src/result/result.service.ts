import { Injectable } from '@nestjs/common';
import { CharacterService } from '../character/character.service';
import { NumberService } from '../number/number.service';

@Injectable()
export class ResultService {
  constructor(
    private readonly characterService: CharacterService,
    private readonly numberService: NumberService
  ) {}

  async getResult(userId: string): Promise<{ result: string }> {
    const char = await this.characterService.getCharacter(userId);
    const num = await this.numberService.getNumber(userId);

    if (!char || num  == undefined) {
      throw new Error('Data is missing');
    }

    return { result: `${char}_${num}` };
  }
}
