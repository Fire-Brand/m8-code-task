import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ResultService } from './result.service';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get(':userId')
  async getResult(@Param('userId') userId: string) {
    try {
      const result = await this.resultService.getResult(userId);
      return result;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
