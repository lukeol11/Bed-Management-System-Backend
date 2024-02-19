import { Controller, Get, Query } from '@nestjs/common';
import { WardsService } from './wards.service';
import { WardDto } from './dto/ward.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/wards')
@ApiTags('wards')
export class WardsController {
    constructor(private readonly wardsService: WardsService) {}

    @Get('/all')
    @ApiResponse({
        status: 200,
        description: 'Get all wards by hospital ID',
        type: WardDto,
        isArray: true
    })
    @ApiQuery({
        name: 'hospital_id',
        required: false,
        type: Number
    })
    async getAllUsers(
        @Query('hospital_id') hospitalId?: number
    ): Promise<WardDto[]> {
        return this.wardsService.findAll(hospitalId);
    }
}
