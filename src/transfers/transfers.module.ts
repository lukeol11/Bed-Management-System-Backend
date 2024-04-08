import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransfersService } from './transfers.service';
import { BookingRequest } from './entities/booking_request.entity';
import { typeOrmConfig } from '../config/typeorm.config';
import { TransfersController } from './transfers.controller';
@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([BookingRequest])
    ],
    controllers: [TransfersController],
    providers: [TransfersService]
})
export class TransfersModule {}

