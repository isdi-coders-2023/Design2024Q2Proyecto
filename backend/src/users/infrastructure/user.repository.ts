import { UserDto } from '../user.dto';

export type FindUserWhere = {
    id?: number;
    email?: string;
    name?: string;
};

export interface UserRepository {
    find(where: FindUserWhere): Promise<UserDto | null>;
    findMany(limit?: number, offset?: number): Promise<UserDto[]>;
    save(user: UserDto): Promise<void>;
}
