import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, UseGuards, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ValidateUserDto } from 'src/entities';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/common/decorators';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Public()
    @Version('1')
    @Post('/generate')
    @HttpCode(HttpStatus.CREATED)
    generateUser(@Body() user: CreateUserDto) {
        return this.userService.generateUserService(user)
    }

    @Public()
    @Version('1')
    @Post('/validate')
    @UseGuards(AuthGuard('local'))
    @HttpCode(HttpStatus.OK)
    async validateUser(@Body() user: ValidateUserDto) {
        try {
            const validatedUser = await this.userService.validateUserService(user);
            const token = await this.userService.generateJwtToken(validatedUser);
            const { password, ...account } = validatedUser
            return { message: "خوش آمدید", account, token }
        } catch (ex) {
            throw new HttpException(ex.message, HttpStatus.UNAUTHORIZED);
        }
    }

    @Public()
    @Version('1')
    @Get('/profile')
    @HttpCode(HttpStatus.OK)
    async getUserProfile(@Req() req) {
        try {
            const { password, ...user } = await this.userService.getUserFromToken(req.headers.authorization.split(' ')[1]);
            return { user };
        } catch (ex) {
            throw new HttpException(ex.message, HttpStatus.UNAUTHORIZED);
        }
    }

}
