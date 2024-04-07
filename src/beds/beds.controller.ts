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
import { BedsService } from './beds.service';
import { CreateBedOccupancyDto } from './dto/createBedOccupancy.dto';
import { CheckoutBedOccupancyDto } from './dto/checkoutBedOccupancy.dto';
import { BedDto } from './dto/Bed.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/beds')
@ApiTags('beds')
export class BedsController {
    constructor(private readonly bedsService: BedsService) {}

    @Get('status/:ward_id')
    getBedStatus(@Param('ward_id') ward_id: number) {
        return this.bedsService.getBedStatus(ward_id);
    }

    @Get('all/:ward_id')
    getAllBeds(@Param('ward_id') ward_id: number) {
        return this.bedsService.getAllBeds(ward_id);
    }

    @Get('active/:bed_id')
    getActiveBedOccupancy(@Param('bed_id') bed_id: number) {
        return this.bedsService.getActiveBedOccupancy(bed_id);
    }

    @Get('find/:bed_id')
    getBedById(@Param('bed_id') bed_id: number) {
        return this.bedsService.getBedById(bed_id);
    }

    @Delete('delete/:bed_id')
    deleteBedById(@Param('bed_id') bed_id: number) {
        return this.bedsService.deleteBedById(bed_id);
    }

    @Post('occupancy')
    createBedOccupancy(@Body() createBedOccupancyDto: CreateBedOccupancyDto) {
        return this.bedsService.createBedOccupancy(createBedOccupancyDto);
    }

    @Patch('disable/:bed_id')
    disableBed(@Param('bed_id') bed_id: number) {
        return this.bedsService.disableBed(bed_id);
    }

    @Patch('enable/:bed_id')
    enableBed(@Param('bed_id') bed_id: number) {
        return this.bedsService.enableBed(bed_id);
    }

    @Post('create')
    @ApiResponse({
        status: 201,
        description: 'Create a new bed',
        type: BedDto
    })
    createBed(@Body() bed: BedDto): Promise<BedDto> {
        return this.bedsService.createBed(bed);
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
