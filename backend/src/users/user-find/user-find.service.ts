import { Injectable } from '@nestjs/common';
import {
    UserRepository,
    User,
    FindUserWhere,
} from '../infrastructure/user.repository';

@Injectable()
export class UserFindService {
    constructor(private repository: UserRepository) {}

    async user(where: FindUserWhere): Promise<User | null> {
        const user = await this.repository.find(where);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
