import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Headers,
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
import { UsersService } from 'src/users/users.service';
import { WardsService } from 'src/wards/wards.service';
import * as dotenv from 'dotenv';
import { Bed } from './entities/bed.entity';
import { BedStatusDto } from './dto/bedStatus.dto';
import { BedOccupancy } from './entities/bedOccupancy.entity';
dotenv.config();

@Controller('api/beds')
@ApiTags('beds')
export class BedsController {
    constructor(
        private readonly bedsService: BedsService,
        private readonly usersService: UsersService,
        private readonly wardsService: WardsService
    ) {}

    @ApiResponse({
        status: 200,
        description: 'Get bed status',
        type: BedStatusDto,
        isArray: true
    })
    @Get('status/:ward_id')
    getBedStatus(@Param('ward_id') ward_id: number): Promise<BedStatusDto[]> {
        return this.bedsService.getBedStatus(ward_id);
    }

    @ApiResponse({
        status: 200,
        description: 'Get all beds',
        type: Bed,
        isArray: true
    })
    @Get('all/:ward_id')
    getAllBeds(@Param('ward_id') ward_id: number): Promise<Bed[]> {
        return this.bedsService.getAllBeds(ward_id);
    }

    @ApiResponse({
        status: 200,
        description: 'Get active bed occupancy',
        type: BedOccupancy,
        isArray: true
    })
    @Get('active/:bed_id')
    getActiveBedOccupancy(
        @Param('bed_id') bed_id: number
    ): Promise<BedOccupancy[]> {
        return this.bedsService.getActiveBedOccupancy(bed_id);
    }

    @ApiResponse({
        status: 200,
        description: 'Get bed by id',
        type: Bed
    })
    @Get('find/:bed_id')
    getBedById(@Param('bed_id') bed_id: number): Promise<Bed> {
        return this.bedsService.getBedById(bed_id);
    }

    @ApiResponse({
        status: 200,
        description: 'Delete bed by id',
        type: String
    })
    @Delete('delete/:bed_id')
    async deleteBedById(
        @Param('bed_id') bed_id: number,
        @Headers('email') email?: string
    ): Promise<string> {
        const requestingUser = await this.usersService.findByEmail(email);
        const bed = await this.bedsService.getBedById(bed_id);
        const ward = await this.wardsService.findWardById(bed.ward_id);

        if (
            (requestingUser?.can_administrate &&
                ward.hospital_id === requestingUser.hospital_id) ||
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
        ) {
            return this.bedsService.deleteBedById(bed_id);
        } else {
            throw new HttpException(
                'Unauthorized access',
                HttpStatus.UNAUTHORIZED
            );
        }
    }

    @ApiResponse({
        status: 201,
        description: 'Create a new bed occupancy',
        type: CreateBedOccupancyDto
    })
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
    async createBed(
        @Body() bed: BedDto,
        @Headers('email') email?: string
    ): Promise<BedDto> {
        const requestingUser = await this.usersService.findByEmail(email);
        const ward = await this.wardsService.findWardById(bed.ward_id);

        if (
            (requestingUser?.can_administrate &&
                ward.hospital_id === requestingUser.hospital_id) ||
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
        ) {
            return this.bedsService.createBed(bed);
        } else {
            throw new HttpException(
                'Unauthorized access',
                HttpStatus.UNAUTHORIZED
            );
        }
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
