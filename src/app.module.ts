import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WardsModule } from './wards/wards.module';
import { PatientsModule } from './patients/patients.module';

@Module({
    imports: [UsersModule, WardsModule, PatientsModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
