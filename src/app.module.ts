import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WardsModule } from './wards/wards.module';
import { PatientsModule } from './patients/patients.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { BedsModule } from './beds/beds.module';
import { TransfersModule } from './transfers/transfers.module';
import { RoutingHistoryModule } from './routing-history/routing-history.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RoomsModule } from './rooms/rooms.module';

@Module({
    imports: [
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 1000
            }
        ]),
        UsersModule,
        WardsModule,
        PatientsModule,
        HospitalsModule,
        BedsModule,
        TransfersModule,
        RoutingHistoryModule,
        RoomsModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
