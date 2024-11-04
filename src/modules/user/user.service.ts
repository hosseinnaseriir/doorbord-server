import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, User, ValidateUserDto } from 'src/entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RoleEnum } from 'src/common/enums';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async generateUserService(user: CreateUserDto) {
        if (user.role === RoleEnum.SUPER_ADMIN) throw new HttpException('شما دسترسی لازم برای ساخت این نقش را ندارید!', HttpStatus.CONFLICT);

        if (!Object.values(RoleEnum).includes(user.role as RoleEnum)) {
            throw new HttpException('نقش وارد شده معتبر نمی‌باشد!', HttpStatus.BAD_REQUEST);
        }

        const existingUser = await this.userRepository.findOneBy({
            username: user.username
        });

        if (existingUser) throw new HttpException('مقدار یوزرنیم تکراری است!', HttpStatus.CONFLICT);
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

    async validateUserService(user: ValidateUserDto) {
        const existsUser = await this.userRepository.findOneBy({ username: user.username });
        if (!existsUser) throw new HttpException('کاربر پیدا نشد', HttpStatus.UNAUTHORIZED);

        const isPasswordMatch: boolean = await bcrypt.compare(user.password, existsUser.password)
        if (!isPasswordMatch) throw new BadRequestException('نام کاربری یا رمز اشتباه است');
        return existsUser;
    }

    async generateJwtToken({ password, ...user }: User) {
        return this.jwtService.sign({ ...user });
    }

    async getUserFromToken(token: string): Promise<User> {
        const decoded = this.jwtService.verify(token);
        const user = await this.userRepository.findOneBy({ id: decoded.id });
        if (!user) throw new HttpException('اکاربر پیدا نشد', HttpStatus.NOT_FOUND);
        return user;
    }

    async getUsersByRole(role: RoleEnum): Promise<User[]> {
        return this.userRepository.find({
            where: { role },
            select: ['id', 'username', 'firstName', 'lastName', 'role']
        })
    }
}
