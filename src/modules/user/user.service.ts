import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserPayload, User } from 'src/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
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
}
