import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as dotenv from 'dotenv';

dotenv.config();

const reqAuthentication =
    process.env.REQUIRE_AUTHENTICATION === 'true' || false;

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (!reqAuthentication) {
            console.warn(
                'Authentication is disabled. All routes are accessible without authentication.'
            );
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedException('No token provided');
        }

        const token = authHeader.split('Bearer ')[1];
        const decodedToken = await this.authService.verifyFirebaseToken(token);
        const userEmail = decodedToken.email;

        const users = await this.usersService.find({
            where: { email: userEmail }
        });
        const user = users[0];

        if (!user) {
            console.warn(`User not found for email: ${userEmail}`);
            throw new UnauthorizedException('User not found');
        }

        req.user = user;
        return true;
    }
}
