import { Test, TestingModule } from '@nestjs/testing';
import {
    User,
    UserRepository,
} from '@src/users/infrastructure/user.repository';
import { userRepoMock } from './user.repository.mock';
import { UserService } from '@src/users/user.service';
import { mockUsers } from './user-mocks';

describe('UserListService', () => {
    let service: UserService;

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
            const user: User = mockUsers.at(-1)!;
            const result = await service.create(user);
            expect(result).toBeUndefined();
        });
        it('Debe lanzar Error si los campos no son correctos', async () => {
            const user: User = {
                email: '',
                name: '',
                password: '',
                surname: '',
                documentId: '',
                birthday: '',
                phoneNumber: '',
                address: '',
                city: '',
                postalCode: '',
                iban: '',
                occupationTarget: null,
                employeePosition: null,
            };
            await expect(service.create(user)).rejects.toThrow(Error);
        });
    });
});
