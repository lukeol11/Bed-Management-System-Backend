import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { UsersService } from 'src/users/users.service';
import { WardsService } from 'src/wards/wards.service';
import { TreatmentLevel } from 'src/wards/entities/treatment-level.entity';
import { User } from 'src/users/entities/user.entity';
import { Ward } from 'src/wards/entities/ward.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([Room, User, Ward, TreatmentLevel])
    ],
    controllers: [RoomsController],
    providers: [RoomsService, UsersService, WardsService]
})
export class RoomsModule {}
