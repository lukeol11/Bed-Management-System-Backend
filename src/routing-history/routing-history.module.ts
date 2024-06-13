import { Module } from '@nestjs/common';
import { RoutingHistoryService } from './routing-history.service';
import { RoutingHistoryController } from './routing-history.controller';
import { RoutingHistory } from './entities/routing-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([RoutingHistory])
    ],
    providers: [RoutingHistoryService],
    controllers: [RoutingHistoryController]
})
export class RoutingHistoryModule {}

