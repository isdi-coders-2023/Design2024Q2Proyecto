import { UserFindService } from '@src/users/user-find/user-find.service';
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
  let service: UserFindService;
  beforeEach(async () => {
    service = new UserFindService(prismaMock);
  });

  describe('getUsers', () => {
    it('should return user from the service', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUsers[0]);

      await expect(
        service.user({ email: 'alice@prisma.io' }),
      ).resolves.toStrictEqual(mockUsers[0]);
      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'alice@prisma.io' },
      });
    });

    it('should return null if we dont find users function parameters', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        service.user({ email: 'not-found@prisma.io' }),
      ).resolves.toStrictEqual(null);
      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'not-found@prisma.io' },
      });
    });

    it('should throw an error from the service', async () => {
      prismaMock.user.findUnique.mockRejectedValue(new Error('Database error'));

      await expect(service.user({ id: undefined })).rejects.toThrow(Error);
    });
  });
});
