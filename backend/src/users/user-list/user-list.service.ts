import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrastructure/user.repository';
import { UserDto } from '../user.dto';
@Injectable()
export class UserListService {
    constructor(private respository: UserRepository) {}

    async users(params: { skip?: number; take?: number }): Promise<UserDto[]> {
        const { skip, take } = params;

        return this.respository.findMany(take, skip);
    }
}
