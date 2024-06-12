import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@src/auth/auth.guard';
import { UserDtoPrimitives } from '../user.dto';
import { UserListService } from './user-list.service';

@Controller('user')
@ApiBearerAuth()
@ApiTags('User')
export class UserListController {
    constructor(private readonly userListService: UserListService) {}

    @Get('/')
    @UseGuards(AuthGuard)
    async getUsers(): Promise<UserDtoPrimitives[]> {
        const users = await this.userListService.users({});
        return users.map((user) => user.toPrimitive());
    }
}
