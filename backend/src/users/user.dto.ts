export type UserDtoPrimitives = {
    id?: number;
    email: string;
    name: string;
    password: string;
    lastname: string;
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
export class UserDto {
    private constructor(
        private readonly email: string,
        private readonly password: string,
        private readonly name: string,
        private readonly lastname: string,
        private readonly documentId: string,
        private readonly birthday: Date,
        private readonly phoneNumber: string,
        private readonly address: string,
        private readonly city: string,
        private readonly postalCode: string,
        private readonly iban: string,
        private readonly occupationTarget: string | null,
        private readonly employeePosition: string | null,
        private readonly id?: number,
    ) {}

    static create(
        email: string,
        name: string,
        password: string,
        lastname: string,
        documentId: string,
        birthday: string,
        phoneNumber: string,
        address: string,
        city: string,
        postalCode: string,
        iban: string,
        occupationTarget?: string,
        employeePosition?: string,
    ): UserDto {
        return new UserDto(
            email,
            name,
            password,
            lastname,
            documentId,
            new Date(birthday),
            phoneNumber,
            address,
            city,
            postalCode,
            iban,
            occupationTarget || null,
            employeePosition || null,
            undefined,
        );
    }

    static fromPrimitives(
        id: number,
        email: string,
        name: string,
        password: string,
        lastname: string,
        documentId: string,
        birthday: string,
        phoneNumber: string,
        address: string,
        city: string,
        postalCode: string,
        iban: string,
        occupationTarget?: string,
        employeePosition?: string,
    ): UserDto {
        return new UserDto(
            email,
            name,
            password,
            lastname,
            documentId,
            new Date(birthday),
            phoneNumber,
            address,
            city,
            postalCode,
            iban,
            occupationTarget || null,
            employeePosition || null,
            id,
        );
    }

    toPrimitive(): UserDtoPrimitives {
        return Object.freeze({
            id: this.id,
            email: this.email,
            password: this.password,
            name: this.name,
            lastname: this.lastname,
            documentId: this.documentId,
            birthday: this.birthday.toISOString(),
            phoneNumber: this.phoneNumber,
            address: this.address,
            city: this.city,
            postalCode: this.postalCode,
            iban: this.iban,
            occupationTarget: this.occupationTarget,
            employeePosition: this.employeePosition,
        });
    }
}
