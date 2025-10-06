import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { FirebaseAuthGuard } from './auth.guard';

@Module({
    imports: [forwardRef(() => UsersModule)],
    providers: [AuthService, FirebaseAuthGuard],
    exports: [AuthService, FirebaseAuthGuard]
})
export class AuthModule {}

