import { Module } from '@nestjs/common';
import { UserListService } from './user-list/user-list.service';
import { UserListController } from './user-list/user-list.controller';
import { DatabaseModule } from '@src/database/database.module';
import { UserFindService } from './user-find/user-find.service';
import { UserRepository } from './infrastructure/user.repository';
import { UserPrismaRepository } from './infrastructure/user.prisma.repository';
import { PrismaService } from '@src/database/prisma-service/prisma-service.service';
import { UsersController } from './users.controller';
import { UserService } from './user.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        {
            provide: UserListService,
            useFactory: (repository: UserRepository) =>
                new UserListService(repository),
            inject: ['UserRepository'],
        },
        {
            provide: UserFindService,
            useFactory: (repository: UserRepository) =>
                new UserFindService(repository),
            inject: ['UserRepository'],
        },
        {
            provide: UserService,
            useFactory: (repository: UserRepository) =>
                new UserService(repository),
            inject: ['UserRepository'],
        },
        {
            provide: 'UserRepository',
            useExisting: UserPrismaRepository,
        },
        {
            provide: UserPrismaRepository,
            useFactory: (prisma: PrismaService) =>
                new UserPrismaRepository(prisma),
            inject: [PrismaService],
        },
    ],
    controllers: [UserListController, UsersController],
    exports: [UserListService, UserFindService],
})
export class UsersModule {}
