import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '@src/users/infrastructure/user.repository';
import { UserService } from '@src/users/user.service';
import { UserMother } from './user.mother';
import { userRepoMock } from './user.repository.mock';

describe('UserListService', () => {
    let service: UserService;
    const spy = jest.spyOn(userRepoMock, 'save');
    const user = UserMother.random();
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: UserService,
                    useFactory: (repository: UserRepository) =>
                        new UserService(repository),
                    inject: ['UserRepository'],
                },
                {
                    provide: 'UserRepository',
                    useValue: userRepoMock,
                },
            ],
        }).compile();
        service = module.get<UserService>(UserService);
    });
    describe('createUser', () => {
        it('Debe retornar void si el usuario se ha creado correctamente', async () => {
            const result = await service.create(user);
            expect(result).toBeUndefined();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(user);
        });
        it('Debe lanzar Error si los campos no son correctos', async () => {
            await expect(service.create(user)).rejects.toThrow(Error);
        });
    });
});
