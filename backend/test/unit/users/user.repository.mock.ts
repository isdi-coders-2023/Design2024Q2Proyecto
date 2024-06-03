import { UserRepository } from '@src/users/infrastructure/user.repository';

export const userRepoMock: jest.Mocked<UserRepository> = {
    find: jest.fn(),
    findMany: jest.fn(),
};
