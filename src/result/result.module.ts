import { Module } from '@nestjs/common';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { CharacterModule } from '../character/character.module';
import { NumberModule } from '../number/number.module';

@Module({
  imports: [CharacterModule, NumberModule],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
