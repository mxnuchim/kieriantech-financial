import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Home endpoint',
    description:
      'This is the home endpoint. It should simply return hello world',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
