import {
    FindUserWhere,
    User,
    UserRepository,
} from '@src/users/infrastructure/user.repository';

export class UserInMemoryRepository implements UserRepository {
    private data: Map<number, User>;
    constructor() {
        this.data = new Map<number, User>();
    }

    async save(user: User): Promise<void> {
        const id = this.data.size + 1;
        user = {
            ...user,
            id,
        };
        this.data.set(user.id, user);
    }

    async find(where: FindUserWhere): Promise<User | null> {
        let found = [...this.data.values()];
        Object.entries(where).forEach(([key, value]) => {
            found = found.filter((user) => user[key] === value);
        });
        return found[0] ?? null;
    }

    async findMany(
        limit?: number | undefined,
        offset?: number | undefined,
    ): Promise<User[]> {
        const data = [...this.data.values()];
        return data.slice(offset || 0, limit || data.length);
    }
}
