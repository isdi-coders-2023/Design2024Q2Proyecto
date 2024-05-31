import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@src/auth/auth.controller';
import { AuthGuard } from '@src/auth/auth.guard';
import { AuthService } from '@src/auth/auth.service';
import { canActivateMock } from '../shared/guards/authGuard';
import { AuthDto } from '@src/auth/dto/auth.dto';

describe('AuthController', () => {
    let controller: AuthController;
    const authServiceMock = {
        signIn: jest.fn(),
    };

    const mockAuthDto: AuthDto = {
        username: 'some-user@test.com',
        password: '1234',
    };
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: AuthService, useValue: authServiceMock }],
        })
            .overrideGuard(AuthGuard)
            .useValue(canActivateMock)
            .compile();

        controller = app.get<AuthController>(AuthController);
    });

    describe('SignIn', () => {
        it('should return sign in', async () => {
            authServiceMock.signIn.mockReturnValue(
                Promise.resolve({ access_token: 'some-token' }),
            );

            const result = await controller.signIn(mockAuthDto);

            expect(result).toEqual({ access_token: 'some-token' });
            expect(authServiceMock.signIn).toHaveBeenCalled();
        });

        it('should throw an error if service throws an error', async () => {
            const errorMessage = 'Unexpected error';
            authServiceMock.signIn.mockRejectedValue(new Error(errorMessage));

            await expect(controller.signIn(mockAuthDto)).rejects.toThrow(
                errorMessage,
            );
        });
    });
});
