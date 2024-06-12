import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './types/user';
import { validateUser } from './validation/validateUser';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('user/add')
  addUser(@Body() body: any) {
    const newUser = { ...body } as User;
    if (!validateUser(newUser)) {
      throw new Error('Invalid user');
    }
    //TODO store user
    return {
      error: null,
      success: true,
      message: 'User saved',
    };
  }
}
