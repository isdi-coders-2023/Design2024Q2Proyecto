import { Body, Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

export type UserRequest = {
    email: string;
    name: string;
    password: string;
    surname: string;
    document_id: string;
    birthday: string;
    phone_number: string;
    address: string;
    city: string;
    postal_code: string;
    iban: string;
    occupation_target?: string;
    employee_position?: string;
};

@Controller('user')
@ApiTags('User')
export class UsersController {
    constructor(private readonly service: UserService) {}
    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() body: UserRequest) {
        const user = UserDto.create(
            body.email,
            body.name,
            body.password,
            body.surname,
            body.document_id,
            body.birthday,
            body.phone_number,
            body.address,
            body.city,
            body.postal_code,
            body.iban,
            body.occupation_target,
            body.employee_position,
        );
        await this.service.create(user);
    }
}
