import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { typeOrmConfig } from '../config/typeorm.config';
@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([Users])
    ],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
