import { TestBed } from '@automock/jest';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@src/auth/auth.service';
import { AuthDto } from '@src/auth/dto/auth.dto';
import { UserFindService } from '@src/users/user-find/user-find.service';
const mockUser = {
    id: 1,
    email: 'alice@prisma.io',
    name: 'Alice',
    password: 'IamAlice',
};

const mockAuthDto: AuthDto = {
    username: 'alice@prisma.io',
    password: 'IamAlice',
};
describe('UserListService', () => {
    let service: AuthService;
    let userFindService: jest.Mocked<UserFindService>;
    let jwtService: jest.Mocked<JwtService>;
    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(AuthService).compile();
        service = unit;
        userFindService = unitRef.get(UserFindService);
        jwtService = unitRef.get(JwtService);
    });

    describe('AuthService', () => {
        it('should return access_token', async () => {
            userFindService.user.mockResolvedValue(Promise.resolve(mockUser));
            jwtService.signAsync.mockResolvedValue(
                Promise.resolve('some-token'),
            );

            await expect(
                service.signIn(mockAuthDto.username, mockAuthDto.password),
            ).resolves.toStrictEqual({ access_token: 'some-token' });

            expect(userFindService.user).toHaveBeenCalledTimes(1);
            expect(userFindService.user).toHaveBeenCalledWith({
                email: mockAuthDto.username,
            });

            expect(jwtService.signAsync).toHaveBeenCalledTimes(1);
            expect(jwtService.signAsync).toHaveBeenCalledWith({
                sub: mockUser.id,
                username: mockUser.email,
            });
        });

        it('should throw Unauthorized if password is incorrect', async () => {
            userFindService.user.mockResolvedValue(Promise.resolve(mockUser));
            await expect(
                service.signIn(mockAuthDto.username, 'bad-password'),
            ).rejects.toThrow(UnauthorizedException);

            expect(userFindService.user).toHaveBeenCalledTimes(1);
            expect(jwtService.verifyAsync).toHaveBeenCalledTimes(0);
        });

        it('should throw Unauthorized if user was not found', async () => {
            userFindService.user.mockResolvedValue(Promise.resolve(null));
            await expect(
                service.signIn('bad-username', 'bad-password'),
            ).rejects.toThrow(UnauthorizedException);

            expect(userFindService.user).toHaveBeenCalledTimes(1);
            expect(jwtService.verifyAsync).toHaveBeenCalledTimes(0);
        });

        it('should throw an error from the service', async () => {
            userFindService.user.mockRejectedValue(new Error('Database error'));

            await expect(
                service.signIn(mockAuthDto.username, mockAuthDto.password),
            ).rejects.toThrow(Error);
        });
    });
});
