import { forwardRef, Module } from '@nestjs/common';
import { BedsService } from './beds.service';
import { BedsController } from './beds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/database/typeorm.config';
import { Bed } from './entities/bed.entity';
import { TreatmentLevel } from 'src/wards/entities/treatment-level.entity';
import { DisabledReason } from './entities/disabled-reasons.entity';
import { WardsModule } from 'src/wards/wards.module';
import { BedOccupancyModule } from 'src/bed-occupancy/bed-occupancy.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([Bed, TreatmentLevel, DisabledReason]),
        WardsModule,
        forwardRef(() => BedOccupancyModule)
    ],
    controllers: [BedsController],
    providers: [BedsService],
    exports: [BedsService]
})
export class BedsModule {}
