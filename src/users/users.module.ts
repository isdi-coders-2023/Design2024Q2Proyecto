import { Module } from '@nestjs/common';
import { UserListService } from './user-list/user-list.service';
import { UserListController } from './user-list/user-list.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserFindService } from './user-find/user-find.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserListService, UserFindService],
  controllers: [UserListController],
  exports: [UserListService, UserFindService],
})
export class UsersModule {}
