import { UserListService } from '../../../src/users/user-list/user-list.service';
import { prismaMock } from '../shared/persistence/singleton';

const mockUsers = [
  {
    id: 1,
    email: 'alice@prisma.io',
    name: 'Alice',
    password: 'IamAlice',
  },
  {
    id: 2,
    email: 'bob@prisma.io',
    name: 'Bob',
    password: 'IamBob',
  },
  {
    id: 3,
    email: 'jhon@prisma.io',
    name: 'Jhon',
    password: 'IamJhon',
  },
];

describe('UserListService', () => {
  let service: UserListService;
  beforeEach(async () => {
    service = new UserListService(prismaMock);
  });

  describe('getUsers', () => {
    it('should return users from the service', async () => {
      prismaMock.user.findMany.mockResolvedValue(mockUsers);

      await expect(service.users({})).resolves.toStrictEqual(mockUsers);
      expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.findMany).toHaveBeenCalledWith({});
    });

    it('should handle function parameters', async () => {
      prismaMock.user.findMany.mockResolvedValue(mockUsers.slice(0, 1));

      await expect(service.users({ skip: 0, take: 1 })).resolves.toStrictEqual([
        mockUsers[0],
      ]);
      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 1,
      });
    });

    it('should throw an error from the service', async () => {
      prismaMock.user.findMany.mockRejectedValue(new Error('Database error'));

      await expect(service.users).rejects.toThrow(Error);
    });
  });
});
