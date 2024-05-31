export type User = {
    [x: string]: any;
    email: string;
    name: string;
    password: string;
    surname: string;
    documentId: string;
    birthday: Date | string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
    iban: string;
    occupationTarget?: string | null;
    employeePosition?: string | null;
};

export type FindUserWhere = {
    id?: number;
    email?: string;
    name?: string;
};

export interface UserRepository {
    find(where: FindUserWhere): Promise<User | null>;
    findMany(limit?: number, offset?: number): Promise<User[]>;
}
