import { Injectable } from '@nestjs/common';
import { UserRepository, User } from '../infrastructure/user.repository';
@Injectable()
export class UserListService {
    constructor(private respository: UserRepository) {}

    async users(params: { skip?: number; take?: number }): Promise<User[]> {
        const { skip, take } = params;

        return this.respository.findMany(take, skip);
    }
}
