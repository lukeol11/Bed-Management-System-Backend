import { Body, Controller, Patch, Post } from '@nestjs/common';

import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { BedOccupancyService } from './bed-occupancy.service';
import { CreateBedOccupancyDto } from './dto/create-bed-occupancy.dto';
import { UpdateBedOccupancyDto } from './dto/update-bed-occupancy.dto';
dotenv.config();

@Roles(Role.Doctor, Role.Nurse)
@ApiBearerAuth()
@Controller('/api/bed-occupancy')
@ApiTags('beds')
export class BedOccupancyController {
    constructor(private readonly bedOccupancyService: BedOccupancyService) {}

    @ApiResponse({
        status: 201,
        description: 'Create a new bed occupancy',
        type: CreateBedOccupancyDto
    })
    @ApiOperation({
        summary: 'Assigns a patient to a bed'
    })
    @Roles(Role.Doctor, Role.Nurse)
    @Post()
    createBedOccupancy(@Body() createBedOccupancyDto: CreateBedOccupancyDto) {
        return this.bedOccupancyService.createBedOccupancy(
            createBedOccupancyDto
        );
    }

    @ApiResponse({
        status: 200,
        description: 'Update bed occupancy',
        type: UpdateBedOccupancyDto
    })
    @Roles(Role.Doctor, Role.Nurse)
    @Patch()
    updateBedOccupancy(@Body() updateBedOccupancyDto: UpdateBedOccupancyDto) {
        return this.bedOccupancyService.updateBedOccupancy(
            updateBedOccupancyDto
        );
    }
}
