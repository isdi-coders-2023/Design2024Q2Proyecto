import { Prisma, PrismaClient } from '@prisma/client';
import { FindUserWhere, User, UserRepository } from './user.repository';

export class UserPrismaRepository implements UserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async find(where: FindUserWhere): Promise<User | null> {
        const prismaWhere: Prisma.UserWhereUniqueInput = where;

        const result = await this.prisma.user.findUnique({
            where: prismaWhere,
        });

        if (!result) {
            null;
        }

        return result as User;
    }

    async findMany(limit?: number, offset?: number): Promise<User[]> {
        const result = await this.prisma.user.findMany({
            take: limit,
            skip: offset,
        });

        return result as User[];
    }
}
