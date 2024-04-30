import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@src/auth/auth.guard';
import { UserListController } from '@src/users/user-list/user-list.controller';
import { UserListService } from '@src/users/user-list/user-list.service';
import { canActivateMock } from '../shared/guards/authGuard';

describe('UserListController', () => {
  let controller: UserListController;
  let mockUserService: jest.Mocked<UserListService>;

  beforeEach(async () => {
    const userListServiceMock = {
      users: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserListController],
      providers: [{ provide: UserListService, useValue: userListServiceMock }],
    })
      .overrideGuard(AuthGuard)
      .useValue(canActivateMock)
      .compile();

    controller = app.get<UserListController>(UserListController);

    mockUserService = app.get<UserListService>(
      UserListService,
    ) as jest.Mocked<UserListService>;
  });

  describe('getUsers', () => {
    it('should return users from the service', async () => {
      const mockUsers = [
        {
          id: 1,
          email: 'alice@prisma.io',
          name: 'Alice',
          password: 'IamAlice',
        },
      ];
      mockUserService.users.mockReturnValue(Promise.resolve(mockUsers));

      const result = await controller.getUsers();

      expect(result).toEqual(mockUsers);
      expect(mockUserService.users).toHaveBeenCalled();
    });

    it('should throw an error if service throws an error', async () => {
      const errorMessage = 'Unexpected error';
      mockUserService.users.mockRejectedValue(new Error(errorMessage));

      await expect(controller.getUsers()).rejects.toThrow(errorMessage);
    });
  });
});
