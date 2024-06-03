import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '@src/users/infrastructure/user.repository';
import { UserListService } from '@src/users/user-list/user-list.service';
import { mockUsers } from './user-mocks';
import { userRepoMock } from './user.repository.mock';

describe('UserListService', () => {
    let service: UserListService;
    const listSpy = jest.spyOn(userRepoMock, 'findMany');

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: UserListService,
                    useFactory: (repository: UserRepository) =>
                        new UserListService(repository),
                    inject: ['UserRepository'],
                },
                {
                    provide: 'UserRepository',
                    useValue: userRepoMock,
                },
            ],
        }).compile();
        service = module.get<UserListService>(UserListService);
    });
    describe('getUsers', () => {
        it('should return users from the service', async () => {
            listSpy.mockReturnValue(Promise.resolve(mockUsers));
            const result = await service.users({});
            expect(result).toStrictEqual(mockUsers);
            expect(listSpy).toHaveBeenCalledTimes(1);
            expect(listSpy).toHaveBeenCalledWith(undefined, undefined);
        });

        it('should handle function parameters', async () => {
            listSpy.mockReturnValue(Promise.resolve(mockUsers.slice(0, 1)));

            const result = await service.users({ skip: 0, take: 1 });
            expect(result).toStrictEqual([mockUsers[0]]);
            expect(listSpy).toHaveBeenCalledWith(1, 0);
        });

        it('should throw an error from the service', async () => {
            listSpy.mockRejectedValue(new Error('Database error'));

            await expect(service.users).rejects.toThrow(Error);
        });
    });
});
