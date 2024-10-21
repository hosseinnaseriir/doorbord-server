// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../enums/roles.enum';

export const ROLE_KEY = 'role';
export const Role = (...role: RoleEnum[]) => SetMetadata(ROLE_KEY, role);
