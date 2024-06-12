import { Prisma, PrismaClient, User } from '@prisma/client';
import { FindUserWhere, UserRepository } from './user.repository';
import { UserDto } from '../user.dto';

export class UserPrismaRepository implements UserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    private hydrate(entity: User): UserDto {
        return UserDto.fromPrimitives(
            entity.id,
            entity.email,
            entity.name,
            entity.password,
            entity.surname,
            entity.documentId,
            entity.birthday.toISOString(),
            entity.phoneNumber,
            entity.address,
            entity.city,
            entity.cp,
            entity.iban,
            entity.occupationTarget ?? undefined,
            entity.employeePosition ?? undefined,
        );
    }

    async find(where: FindUserWhere): Promise<UserDto | null> {
        const prismaWhere = where as Prisma.UserWhereUniqueInput;

        const result = await this.prisma.user.findUnique({
            where: prismaWhere,
        });

        if (!result) {
            return null;
        }

        return this.hydrate(result);
    }

    async findMany(limit?: number, offset?: number): Promise<UserDto[]> {
        const result = await this.prisma.user.findMany({
            take: limit,
            skip: offset,
        });

        return result.map((user) => this.hydrate(user));
    }

    async save(user: UserDto): Promise<void> {
        const {
            email,
            name,
            password,
            lastname,
            address,
            birthday,
            city,
            documentId,
            iban,
            phoneNumber,
            postalCode,
            employeePosition,
            occupationTarget,
        } = user.toPrimitive();
        await this.prisma.user.create({
            data: {
                email,
                name,
                password,
                surname: lastname,
                address,
                birthday,
                city,
                documentId,
                iban,
                phoneNumber,
                cp: postalCode,
                employeePosition,
                occupationTarget,
            },
        });
    }
}
