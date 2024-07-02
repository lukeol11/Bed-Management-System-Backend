import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransfersService } from './transfers.service';
import { BookingRequest } from './entities/booking_request.entity';
import { typeOrmConfig } from '../config/typeorm.config';
import { TransfersController } from './transfers.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { BedsModule } from 'src/beds/beds.module';
@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([BookingRequest, User]),
        forwardRef(() => BedsModule)
    ],
    controllers: [TransfersController],
    providers: [TransfersService, UsersService],
    exports: [TransfersService]
})
export class TransfersModule {}
