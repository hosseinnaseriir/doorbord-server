import { Body, Controller, Get, HttpCode, HttpStatus, Post, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserPayload } from 'src/entities';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Version('1')
    @Post('/generate')
    @HttpCode(HttpStatus.CREATED)
    generateUser(@Body() user: CreateUserPayload) {
        return this.userService.generateUserService(user)
    }
}
