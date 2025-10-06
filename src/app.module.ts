import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
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
import { AuthModule } from './auth/auth.module';
import { TerminusModule } from '@nestjs/terminus';
import { FirebaseHealthIndicator } from './auth/firebase.health';

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
        RoomsModule,
        AuthModule,
        TerminusModule
    ],
    controllers: [HealthController],
    providers: [
        FirebaseHealthIndicator,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
