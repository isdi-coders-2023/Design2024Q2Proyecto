import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserFindService } from '../users/user-find/user-find.service';

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
        const user = await this.userFindService.user({ email: username });

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
