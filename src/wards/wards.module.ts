import { Module } from '@nestjs/common';
import { WardsService } from './wards.service';
import { WardsController } from './wards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { Ward } from './entities/ward.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([Ward])
    ],
    controllers: [WardsController],
    providers: [WardsService]
})
export class WardsModule {}
