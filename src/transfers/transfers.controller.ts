import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query
} from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { UsersService } from 'src/users/users.service';
import { BookingRequest } from './entities/booking_request.entity';
import { BookingRequestDto } from './dto/booking_requests.dto';
import { BookingApprovedDto } from './dto/booking_approved.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('/api/transfers')
@ApiTags('transfers')
export class TransfersController {
    constructor(
        private readonly transfersService: TransfersService,
        private readonly usersService: UsersService
    ) {}

    @Get('/all')
    @ApiResponse({
        status: 200,
        description: 'Get all transfers or filter by hospital ID',
        type: BookingRequestDto,
        isArray: true
    })
    @ApiQuery({
        name: 'hospital_id',
        required: false,
        type: Number
    })
    async getAllTransfers(
        @Query('hospital_id') hospitalId?: number
    ): Promise<BookingRequestDto[]> {
        return this.transfersService.findAll(hospitalId);
    }

    @Post('/create')
    @ApiResponse({
        status: 201,
        description: 'Create a new transfer',
        type: BookingRequestDto
    })
    async createTransfer(
        @Body() transfer: BookingRequestDto
    ): Promise<BookingRequestDto> {
        return this.transfersService.createTransfer(transfer);
    }

    @Post('/approve')
    @ApiResponse({
        status: 200,
        description: 'Approve a transfer',
        type: BookingApprovedDto
    })
    async approveTransfer(
        @Body() approval: BookingApprovedDto,
        @Headers('email') email?: string
    ): Promise<BookingApprovedDto> {
        const requestingUser = await this.usersService.findByEmail(email);
        const bookingRequest = await this.transfersService.findById(
            approval.id
        );

        if (
            (requestingUser?.can_approve_requests &&
                bookingRequest.hospitalId === requestingUser.hospital_id) ||
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
        ) {
            return this.transfersService.approveTransfer(approval);
        } else {
            throw new HttpException(
                'Unauthorized access',
                HttpStatus.UNAUTHORIZED
            );
        }
    }

    @Delete('/delete/:id')
    @ApiResponse({
        status: 200,
        description: 'Delete a transfer by ID',
        type: BookingRequest
    })
    async deleteTransfer(
        @Param('id') id: number,
        @Headers('email') email?: string
    ): Promise<string> {
        const requestingUser = await this.usersService.findByEmail(email);
        const bookingRequest = await this.transfersService.findById(id);

        if (
            (requestingUser?.can_approve_requests &&
                bookingRequest.hospitalId === requestingUser.hospital_id) ||
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
        ) {
            return this.transfersService.delete(id);
        } else {
            throw new HttpException(
                'Unauthorized access',
                HttpStatus.UNAUTHORIZED
            );
        }
    }
}
