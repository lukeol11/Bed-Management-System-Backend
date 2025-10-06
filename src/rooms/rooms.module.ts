import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { typeOrmConfig } from 'src/database/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { TreatmentLevel } from 'src/wards/entities/treatment-level.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([Room, TreatmentLevel])
    ],
    controllers: [RoomsController],
    providers: [RoomsService]
})
export class RoomsModule {}
