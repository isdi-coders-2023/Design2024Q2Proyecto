import { UserRepository } from './infrastructure/user.repository';
import { UserDto } from './user.dto';

export class UserService {
    constructor(private readonly repository: UserRepository) {}

    async create(user: UserDto): Promise<void> {
        await this.repository.save(user);
    }
}
