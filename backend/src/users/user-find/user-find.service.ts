import { Injectable } from '@nestjs/common';
import {
    FindUserWhere,
    UserRepository,
} from '../infrastructure/user.repository';
import { UserDto } from '../user.dto';

@Injectable()
export class UserFindService {
    constructor(private repository: UserRepository) {}

    async user(where: FindUserWhere): Promise<UserDto | null> {
        const user = await this.repository.find(where);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
