import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { NumberService } from './number.service';

@Controller('number')
export class NumberController {
  constructor(private readonly numberService: NumberService) {}

  @Post()
  @HttpCode(200)
  async insertNumber(@Body() body: { num: number; userId: string }) {
    await this.numberService.setNumber(body.userId, body.num);
  }
}
