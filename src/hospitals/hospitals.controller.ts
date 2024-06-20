import { Controller, Get, Query } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { HospitalDto } from './dto/hospital.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('/api/hospitals')
@ApiTags('hospitals')
export class HospitalsController {
    constructor(private readonly hospitalsService: HospitalsService) {}

    @Get('/all')
    @ApiResponse({
        status: 200,
        description: 'Get all hospitals',
        type: HospitalDto,
        isArray: true
    })
    async getAllHospitals(): Promise<HospitalDto[]> {
        return this.hospitalsService.findAll();
    }

    @Get('/find')
    @ApiResponse({
        status: 200,
        description: 'Get hospital by ID',
        type: HospitalDto
    })
    @ApiQuery({
        name: 'id',
        required: true,
        type: Number
    })
    async getHospitalById(@Query('id') id: number): Promise<HospitalDto> {
        return this.hospitalsService.findHospitalById(id);
    }
}
