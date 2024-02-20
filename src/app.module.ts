import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/user.controller';
import { WardsModule } from './wards/wards.module';
import { PatientsModule } from './patients/patients.module';

@Module({
    imports: [UsersModule, WardsModule, PatientsModule],
    controllers: [AppController, UsersController],
    providers: [AppService]
})
export class AppModule {}

