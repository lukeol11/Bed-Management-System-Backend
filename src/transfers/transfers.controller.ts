import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query
} from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { BookingRequest } from './entities/booking_request.entity';
import { BookingRequestDto } from './dto/booking_requests.dto';
import { BookingApprovedDto } from './dto/booking_approved.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/transfers')
@ApiTags('transfers')
export class TransfersController {
    constructor(private readonly transfersService: TransfersService) {}

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
        @Body() approval: BookingApprovedDto
    ): Promise<BookingApprovedDto> {
        return this.transfersService.approveTransfer(approval);
    }

    @Delete('/delete/:id')
    @ApiResponse({
        status: 200,
        description: 'Delete a transfer by ID',
        type: BookingRequest
    })
    async deleteTransfer(@Param('id') id: number): Promise<string> {
        return this.transfersService.delete(id);
    }
}
