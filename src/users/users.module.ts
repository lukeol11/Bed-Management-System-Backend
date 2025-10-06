import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { typeOrmConfig } from '../database/typeorm.config';
import { UsersController } from './users.controller';
import { RolesGuard } from './roles.guard';
import { AuthModule } from 'src/auth/auth.module';
import { WardsModule } from 'src/wards/wards.module';
import { RoutingHistoryModule } from 'src/routing-history/routing-history.module';
@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([User]),
        AuthModule,
        WardsModule,
        RoutingHistoryModule
    ],
    controllers: [UsersController],
    providers: [UsersService, RolesGuard],
    exports: [UsersService, RolesGuard]
})
export class UsersModule {}

