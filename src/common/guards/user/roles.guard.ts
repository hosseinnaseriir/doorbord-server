// roles.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/common/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<RoleEnum[]>(ROLE_KEY, context.getHandler());
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; 
        if (!user || !user.role) {
            throw new ForbiddenException('Access denied');
        }

        const hasRole = () => requiredRoles.includes(user.role);

        if (!hasRole()) {
            throw new ForbiddenException('Access denied');
        }

        return true;
    }
}
