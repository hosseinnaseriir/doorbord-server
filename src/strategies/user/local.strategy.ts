import { UserService } from './../../modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            usernameField: 'username',
        });
    }
    async validate(username: string, password: string): Promise<User> {
        const loginPayload = { username, password };
        const user = await this.userService.validateUserService(loginPayload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}