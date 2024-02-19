import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { WardsService } from './wards.service';
import { WardDto } from './dto/ward.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ward } from './entities/ward.entity';
import { UpdateWardDto } from './dto/updateWard.dto';

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

    @Get('/wardById')
    @ApiResponse({
        status: 200,
        description: 'Get ward by ID',
        type: WardDto
    })
    @ApiQuery({
        name: 'id',
        required: true,
        type: Number
    })
    async getWardById(@Query('id') id: number): Promise<WardDto> {
        return this.wardsService.findWardById(id);
    }

    @Patch('/update/:id')
    @ApiResponse({
        status: 200,
        description: 'Update ward properties by ID',
        type: WardDto
    })
    async updateWard(
        @Param('id') id: number,
        @Body() ward: UpdateWardDto
    ): Promise<WardDto> {
        return this.wardsService.updateWard(id, ward);
    }
}
