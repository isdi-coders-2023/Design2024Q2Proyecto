import { UserDto } from '@src/users/user.dto';
import { fakerES } from '@faker-js/faker';

export class UserMother {
    static create(
        email: string,
        password: string,
        name: string,
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
        return UserDto.create(
            email,
            name,
            password,
            lastname,
            documentId,
            birthday,
            phoneNumber,
            address,
            city,
            postalCode,
            iban,
            occupationTarget,
            employeePosition,
        );
    }

    static random(values: { email?: string } = {}) {
        return this.create(
            values.email ?? fakerES.internet.email(),
            fakerES.internet.password(),
            fakerES.person.firstName(),
            fakerES.person.lastName(),
            this.dni(),
            fakerES.date.birthdate().toISOString(),
            fakerES.phone.number(),
            fakerES.location.streetAddress(),
            fakerES.location.city(),
            fakerES.location.zipCode(),
            fakerES.finance.iban(),
        );
    }

    static dni(): string {
        const randomDigits = fakerES.number
            .int({ min: 10_000_000, max: 99_999_999 })
            .toString();
        const letterIndex = Number.parseInt(randomDigits, 10) % 23;
        const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const dniLetter = letters.charAt(letterIndex);
        return randomDigits + dniLetter;
    }
}
