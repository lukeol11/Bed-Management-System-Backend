import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransfersService } from './transfers.service';
import { BookingRequest } from './entities/booking_request.entity';
import { typeOrmConfig } from '../database/typeorm.config';
import { TransfersController } from './transfers.controller';
import { BedOccupancyModule } from 'src/bed-occupancy/bed-occupancy.module';
@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([BookingRequest]),
        forwardRef(() => BedOccupancyModule)
    ],
    controllers: [TransfersController],
    providers: [TransfersService],
    exports: [TransfersService]
})
export class TransfersModule {}
