import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserFindService } from '../users/user-find/user-find.service';
import { UserDto } from '@src/users/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userFindService: UserFindService,
        private jwtService: JwtService,
    ) {}

    async signIn(
        username: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user: UserDto | null = await this.userFindService.user({
            email: username,
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        const { password } = user.toPrimitive();
        if (password !== pass) {
            throw new UnauthorizedException();
        }

        const { id, email } = user.toPrimitive();
        const payload = { sub: id, username: email };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
