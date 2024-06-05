import { User, UserRepository } from './infrastructure/user.repository';

export class UserService {
    constructor(private readonly repository: UserRepository) {}

    UserRules = {
        id: ['requied'],
        name: ['requied'],
    };

    async create(user: User): Promise<void> {
        if (user.name === '') {
            throw new Error('El name es obligatorio');
        }
        await this.repository.save(user);
    }
}
