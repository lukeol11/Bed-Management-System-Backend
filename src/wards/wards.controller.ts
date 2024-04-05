import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { WardsService } from './wards.service';
import { WardDto } from './dto/ward.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ward } from './entities/ward.entity';
import { UpdateWardDto } from './dto/updateWard.dto';
import { TreatmentLevelDto } from './dto/treatmentLevel.dto';

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
    async getAllWards(
        @Query('hospital_id') hospitalId?: number
    ): Promise<WardDto[]> {
        return this.wardsService.findAll(hospitalId);
    }

    @Get('/treatment_levels')
    @ApiResponse({
        status: 200,
        description: 'Get all treatment levels',
        type: TreatmentLevelDto,
        isArray: true
    })
    async getTreatmentLevels(): Promise<TreatmentLevelDto[]> {
        return this.wardsService.getTreatmentLevels();
    }

    @Post('/create')
    @ApiResponse({
        status: 201,
        description: 'Create a new ward',
        type: WardDto
    })
    async createWard(@Body() ward: WardDto): Promise<WardDto> {
        return this.wardsService.createWard(ward);
    }

    @Get('/find')
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

    @Delete('/delete/:id')
    @ApiResponse({
        status: 200,
        description: 'Delete ward by ID',
        type: Ward
    })
    async deleteWard(@Param('id') id: number): Promise<string> {
        return this.wardsService.deleteWard(id);
    }
}

