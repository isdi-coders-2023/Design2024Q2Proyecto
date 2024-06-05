import { Body, Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './infrastructure/user.repository';

@Controller('user')
@ApiTags('User')
export class UsersController {
    constructor(private readonly service: UserService) {}
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() body: User) {
        await this.service.create(body);
    }
}
