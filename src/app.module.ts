import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/user.controller';
import { UsersService } from './users/users.service';
import { WardsModule } from './wards/wards.module';
import { HospitalsModule } from './hospitals/hospitals.module';

@Module({
    imports: [UsersModule, WardsModule, HospitalsModule],
    controllers: [AppController, UsersController],
    providers: [AppService]
})
export class AppModule {}

