import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { typeOrmConfig } from '../config/typeorm.config';
@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([User])
    ],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
