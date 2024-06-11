import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Sign in',
        description: "Sign in with a user's credentials",
    })
    @ApiOkResponse({ status: 200 })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized user',
    })
    @UsePipes(new ValidationPipe())
    signIn(@Body() signInDto: AuthDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}
