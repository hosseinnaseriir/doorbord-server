import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserPayload, User, ValidateUserPayload } from 'src/entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async generateUserService(user: CreateUserPayload) {
        const existingUser = await this.userRepository.findOneBy({
            username: user.username
        });

        if (existingUser) throw new HttpException('User already exists', HttpStatus.CONFLICT);
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        const newUser = this.userRepository.create({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            password: hashedPassword,
        });
        await this.userRepository.save(newUser);
    }

    async validateUserService(user: ValidateUserPayload) {
        const existsUser = await this.userRepository.findOneBy({ username: user.username });
        if (!existsUser) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        const isPasswordMatch: boolean = await bcrypt.compare(user.password, existsUser.password)
        if (!isPasswordMatch) throw new BadRequestException('Password does not match');
        return existsUser;
    }

    async generateJwtToken({ password, ...user }: User) {
        return this.jwtService.sign({ ...user });
    }

    async getUserFromToken(token: string): Promise<User> {
        const decoded = this.jwtService.verify(token);
        const user = await this.userRepository.findOneBy({ id: decoded.id });
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return user;
    }
}
