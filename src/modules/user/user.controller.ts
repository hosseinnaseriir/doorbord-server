import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UseGuards, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserPayload, ValidateUserPayload } from 'src/entities';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/decorators';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Public()
    @Version('1')
    @Post('/generate')
    @HttpCode(HttpStatus.CREATED)
    generateUser(@Body() user: CreateUserPayload) {
        return this.userService.generateUserService(user)
    }

    @Public()
    @Version('1')
    @Post('/validate')
    @UseGuards(AuthGuard('local'))
    @HttpCode(HttpStatus.OK)
    async  validateUser(@Body() user: ValidateUserPayload) {
        try {
            const validatedUser = await this.userService.validateUserService(user);
            const token = await this.userService.generateJwtToken(validatedUser);
            return { message: "Login Seccessfull", validatedUser, token }
        } catch (ex) {
            throw new HttpException(ex.message, HttpStatus.UNAUTHORIZED);
        }
    }
}
