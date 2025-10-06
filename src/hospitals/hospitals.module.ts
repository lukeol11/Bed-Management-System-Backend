import { Module } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { HospitalsController } from './hospitals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/database/typeorm.config';
import { Hospital } from './entities/hospital.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([Hospital])
    ],
    controllers: [HospitalsController],
    providers: [HospitalsService],
    exports: [HospitalsService]
})
export class HospitalsModule {}
