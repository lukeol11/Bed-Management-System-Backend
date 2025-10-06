import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/database/typeorm.config';
import { BedOccupancyService } from './bed-occupancy.service';
import { BedOccupancyController } from './bed-occupancy.controller';
import { BedOccupancy } from './entities/bed-occupancy.entity';
import { BedsModule } from 'src/beds/beds.module';
import { TransfersModule } from 'src/transfers/transfers.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([BedOccupancy]),
        forwardRef(() => BedsModule),
        forwardRef(() => TransfersModule)
    ],
    controllers: [BedOccupancyController],
    providers: [BedOccupancyService],
    exports: [BedOccupancyService]
})
export class BedOccupancyModule {}
