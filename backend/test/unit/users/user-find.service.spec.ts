import { UserFindService } from '@src/users/user-find/user-find.service';
import { mockUsers } from './user-mocks';
import { Test, TestingModule } from '@nestjs/testing';
import {
    User,
    UserRepository,
} from '@src/users/infrastructure/user.repository';
import { userRepoMock } from './user.repository.mock';
import { UserMother } from './user.mother';

describe('UserListService', () => {
    let service: UserFindService;
    const findSpy = jest.spyOn(userRepoMock, 'find');

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: UserFindService,
                    useFactory: (repository: UserRepository) =>
                        new UserFindService(repository),
                    inject: ['UserRepository'],
                },
                {
                    provide: 'UserRepository',
                    useValue: userRepoMock,
                },
            ],
        }).compile();
        service = module.get<UserFindService>(UserFindService);
    });

    describe('getUsers', () => {
        it('should return user from the service', async () => {
            const mockEmail = 'alice@prisma.io';
            const mockUser = UserMother.random({ email: mockEmail });
            findSpy.mockReturnValue(Promise.resolve(mockUser));

            const result = await service.user({ email: mockEmail });
            expect(result).toStrictEqual(mockUser);

            expect(findSpy).toHaveBeenCalledTimes(1);
            expect(findSpy).toHaveBeenCalledWith({ email: mockEmail });
        });

        it('should throw now found if we dont find users', async () => {
            findSpy.mockReturnValue(Promise.resolve(null));

            await expect(service.user({ id: 10 })).rejects.toThrow(
                'User not found',
            );
        });

        it('should throw an error from the service', async () => {
            findSpy.mockRejectedValue(new Error('Database error'));

            await expect(service.user({ id: undefined })).rejects.toThrow(
                Error,
            );
        });
    });
});
