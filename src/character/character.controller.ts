import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @HttpCode(200)
  async insertCharacter(@Body() body: { char: string; userId: string }) {
    await this.characterService.setCharacter(body.userId, body.char);
  }
}
