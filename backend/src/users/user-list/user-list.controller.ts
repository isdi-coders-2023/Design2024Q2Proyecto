import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserListService } from './user-list.service';
import { AuthGuard } from '@src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../infrastructure/user.repository';

@Controller('user')
@ApiBearerAuth()
@ApiTags('User')
export class UserListController {
    constructor(private readonly userListService: UserListService) {}

    @Get('/')
    @UseGuards(AuthGuard)
    async getUsers(): Promise<User[]> {
        return this.userListService.users({});
    }
}
