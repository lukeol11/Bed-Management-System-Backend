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
import { WardsService } from './wards.service';
import { WardDto } from './dto/ward.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ward } from './entities/ward.entity';
import { UpdateWardDto } from './dto/updateWard.dto';
import { TreatmentLevelDto } from './dto/treatmentLevel.dto';
import { UsersService } from '../users/users.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('/api/wards')
@ApiTags('wards')
export class WardsController {
    constructor(
        private readonly wardsService: WardsService,
        private readonly usersService: UsersService
    ) {}

    @Get('/all')
    @ApiResponse({
        status: 200,
        description: 'Get all wards by hospital ID',
        type: Ward,
        isArray: true
    })
    @ApiQuery({
        name: 'hospital_id',
        required: false,
        type: Number
    })
    async getAllWards(
        @Query('hospital_id') hospitalId?: number
    ): Promise<Ward[]> {
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
    async createWard(
        @Body() ward: WardDto,
        @Headers('email') email?: string
    ): Promise<WardDto> {
        const requestingUser = await this.usersService.findByEmail(email);

        if (
            (requestingUser?.can_administrate &&
                ward.hospital_id === requestingUser.hospital_id) ||
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
        ) {
            return this.wardsService.createWard(ward);
        } else {
            throw new HttpException(
                'Unauthorized access',
                HttpStatus.UNAUTHORIZED
            );
        }
    }

    @Get('/find')
    @ApiResponse({
        status: 200,
        description: 'Get ward by ID',
        type: Ward
    })
    @ApiQuery({
        name: 'id',
        required: true,
        type: Number
    })
    async getWardById(@Query('id') id: number): Promise<Ward> {
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
        @Body() ward: UpdateWardDto,
        @Headers('email') email?: string
    ): Promise<WardDto> {
        const requestingUser = await this.usersService.findByEmail(email);
        const wardDetails = await this.wardsService.findWardById(id);

        if (
            (requestingUser?.can_administrate &&
                wardDetails.hospital_id === requestingUser.hospital_id) ||
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
        ) {
            return this.wardsService.updateWard(id, ward);
        } else {
            throw new HttpException(
                'Unauthorized access',
                HttpStatus.UNAUTHORIZED
            );
        }
    }

    @Delete('/delete/:id')
    @ApiResponse({
        status: 200,
        description: 'Delete ward by ID',
        type: Ward
    })
    async deleteWard(
        @Param('id') id: number,
        @Headers('email') email?: string
    ): Promise<string> {
        const requestingUser = await this.usersService.findByEmail(email);
        const ward = await this.wardsService.findWardById(id);

        if (
            (requestingUser?.can_administrate &&
                ward.hospital_id === requestingUser.hospital_id) ||
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
        ) {
            return this.wardsService.deleteWard(id);
        } else {
            throw new HttpException(
                'Unauthorized access',
                HttpStatus.UNAUTHORIZED
            );
        }
    }
}
