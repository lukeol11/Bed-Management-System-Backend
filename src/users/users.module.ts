import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { typeOrmConfig } from '../config/typeorm.config';
import { UsersController } from './users.controller';
@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
