import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserListService } from './user-list.service';
import { AuthGuard } from '../../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
