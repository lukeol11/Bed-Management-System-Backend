import { Module, forwardRef } from '@nestjs/common';
import { BedsService } from './beds.service';
import { BedsController } from './beds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { Bed } from './entities/bed.entity';
import { BedOccupancy } from './entities/bedOccupancy.entity';
import { User } from 'src/users/entities/user.entity';
import { Ward } from 'src/wards/entities/ward.entity';
import { UsersService } from 'src/users/users.service';
import { WardsService } from 'src/wards/wards.service';
import { TreatmentLevel } from 'src/wards/entities/treatment-level.entity';
import { BedStatus } from './entities/bedStatus.entity';
import { DisabledReason } from './entities/disabledReasons.entity';
import { WardsModule } from 'src/wards/wards.module';
import { TransfersModule } from 'src/transfers/transfers.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([
            Bed,
            BedOccupancy,
            BedStatus,
            User,
            Ward,
            TreatmentLevel,
            DisabledReason
        ]),
        WardsModule,
        forwardRef(() => TransfersModule)
    ],
    controllers: [BedsController],
    providers: [BedsService, UsersService, WardsService],
    exports: [BedsService]
})
export class BedsModule {}
