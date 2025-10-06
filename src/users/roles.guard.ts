import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './enums/role.enum';
import { WardsService } from 'src/wards/wards.service';
import { User } from './entities/user.entity';
import * as dotenv from 'dotenv';
import { expandRoles } from './role.utils';
import { RoutingHistoryService } from 'src/routing-history/routing-history.service';

dotenv.config();

const reqAuthentication =
    process.env.REQUIRE_AUTHENTICATION === 'true' || false;

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly wardsService: WardsService,
        private readonly routingHistoryService: RoutingHistoryService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (!reqAuthentication) {
            console.warn(
                'Authentication is disabled. All routes are accessible without authentication.'
            );
            return true;
        }

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) {
            return true;
        }

        const req = context.switchToHttp().getRequest();

        const method = req.method;
        const url = req.url;
        const user: User = req.user;

        const hospitalId = req.query.hospitalId ?? req.body.hospitalId;
        const wardId = req.query.wardId ?? req.body.wardId;
        const email = req.query.email ?? req.body.email;

        this.routingHistoryService.addRoutingHistory({
            method,
            request: url,
            userId: user?.id
        });

        if (!user?.roles) {
            return false;
        }
        if (hospitalId) {
            if (Number(hospitalId) !== Number(user.hospitalId)) {
                console.warn(
                    `User ${user.id} does not have access to hospitalId ${hospitalId}. User's hospitalId is ${user.hospitalId}`
                );
                return false;
            }
        }

        if (wardId) {
            const ward = await this.wardsService.findWardById(wardId);
            if (Number(ward?.hospitalId) !== Number(user.hospitalId)) {
                console.warn(
                    `User ${user.id} does not have access to wardId ${wardId}. Ward's hospitalId is ${ward?.hospitalId}, user's hospitalId is ${user.hospitalId}`
                );
                return false;
            }
        }

        if (req.url.startsWith('/api/users') && email === user.email) {
            return true;
        }

        const expandedUserRoles = expandRoles(user.roles);
        return requiredRoles.some((role) => expandedUserRoles.has(role));
    }
}
