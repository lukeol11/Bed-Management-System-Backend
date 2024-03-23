import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BedsService } from './beds.service';
import { CreateBedOccupancyDto } from './dto/createBedOccupancy.dto';
import { CheckoutBedOccupancyDto } from './dto/checkoutBedOccupancy.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/beds')
@ApiTags('beds')
export class BedsController {
    constructor(private readonly bedsService: BedsService) {}

    @Get('status/:ward_id')
    getBedStatus(@Param('ward_id') ward_id: number) {
        return this.bedsService.getBedStatus(ward_id);
    }

    @Post('occupancy')
    createBedOccupancy(@Body() createBedOccupancyDto: CreateBedOccupancyDto) {
        return this.bedsService.createBedOccupancy(createBedOccupancyDto);
    }

    @Post('checkout')
    checkoutBedOccupancy(
        @Body() checkoutBedOccupancyDto: CheckoutBedOccupancyDto,
        @Query('bed_id') bed_id?: number,
        @Query('patient_id') patient_id?: number
    ) {
        return this.bedsService.checkoutBedOccupancy(
            checkoutBedOccupancyDto,
            bed_id,
            patient_id
        );
    }
}
