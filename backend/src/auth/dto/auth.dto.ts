import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @IsNotEmpty({ message: 'Email no debe estar vacío' })
    @IsEmail({}, { message: 'Email debe ser un correo electrónico' })
    username!: string;

    @IsNotEmpty({ message: 'La contraseña no debe estar vacía' })
    @IsString({ message: 'La contraseña debe ser un string' })
    password!: string;
}
