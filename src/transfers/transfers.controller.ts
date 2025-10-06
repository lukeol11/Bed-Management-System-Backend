import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query
} from '@nestjs/common';
import { RequestType, TransfersService } from './transfers.service';
import { BookingRequest } from './entities/booking_request.entity';
import { BookingRequestDto } from './dto/booking_requests.dto';
import { BookingApprovedDto } from './dto/booking_approved.dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
dotenv.config();

@Roles(Role.User)
@ApiBearerAuth()
@Controller('/api/transfers')
@ApiTags('transfers')
export class TransfersController {
    constructor(private readonly transfersService: TransfersService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description:
            'Get transfers with optional filters: hospital_id, patient_id, user_id, type',
        type: BookingRequest,
        isArray: true
    })
    @ApiQuery({ name: 'hospital_id', required: false, type: Number })
    @ApiQuery({ name: 'patient_id', required: false, type: Number })
    @ApiQuery({ name: 'user_id', required: false, type: Number })
    @ApiQuery({
        name: 'type',
        required: false,
        type: String,
        enum: ['approved', 'pending']
    })
    async getTransfers(
        @Query('hospital_id') hospitalId?: number,
        @Query('patient_id') patientId?: number,
        @Query('user_id') createdBy?: number,
        @Query('type') type?: RequestType
    ): Promise<BookingRequest[]> {
        return this.transfersService.findRequests({
            hospitalId,
            patientId,
            createdBy,
            type
        });
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new transfer request'
    })
    @ApiResponse({
        status: 201,
        description: 'Create a new transfer',
        type: BookingRequest
    })
    @ApiBody({
        type: BookingRequestDto
    })
    async createTransfer(
        @Body() transfer: BookingRequestDto
    ): Promise<BookingRequest> {
        return this.transfersService.createTransfer(transfer);
    }

    @Post('/approve')
    @ApiOperation({
        summary: 'Approve a transfer request',
        description:
            'This endpoint approves the transfer request and updates the bed occupancy for the current and new beds.'
    })
    @ApiResponse({
        status: 200,
        description: 'Approve a transfer',
        type: BookingRequest
    })
    @Roles(Role.BedManager)
    async approveTransfer(
        @Body() approval: BookingApprovedDto
    ): Promise<BookingRequest> {
        return this.transfersService.approveTransfer(approval);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Delete a transfer by ID',
        type: BookingRequest
    })
    @Roles(Role.BedManager)
    async deleteTransfer(@Param('id') id: number): Promise<string> {
        return this.transfersService.delete(id);
    }
}
