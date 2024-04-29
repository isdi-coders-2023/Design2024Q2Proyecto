import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Global')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/isAlive')
  isAlive(): string {
    return this.appService.isAlive();
  }
}
