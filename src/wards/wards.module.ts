import { Module } from '@nestjs/common';
import { WardsService } from './wards.service';
import { WardsController } from './wards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/database/typeorm.config';
import { Ward } from './entities/ward.entity';
import { TreatmentLevel } from './entities/treatment-level.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([Ward, TreatmentLevel]),
        AuthModule
    ],
    controllers: [WardsController],
    providers: [WardsService],
    exports: [WardsService]
})
export class WardsModule {}
