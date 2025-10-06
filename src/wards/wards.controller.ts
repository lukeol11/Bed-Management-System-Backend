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
import { CreateWardDto } from './dto/create-ward.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ward } from './entities/ward.entity';
import { UpdateWardDto } from './dto/update-ward.dto';
import * as dotenv from 'dotenv';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { TreatmentLevel } from './entities/treatment-level.entity';
import { WardQueryParamsDto } from './dto/query-params.dto';
import { FindManyOptions } from 'typeorm';
dotenv.config();

@Roles(Role.User)
@ApiBearerAuth()
@Controller('/api/wards')
@ApiTags('wards')
export class WardsController {
    constructor(private readonly wardsService: WardsService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Get all wards by hospital ID',
        type: Ward,
        isArray: true
    })
    async getAllWards(@Query() params?: WardQueryParamsDto): Promise<Ward[]> {
        const options: FindManyOptions<Ward> = {
            where: {}
        };
        if (params?.id) {
            options.where['id'] = params.id;
        }
        if (params?.hospitalId) {
            options.where['hospitalId'] = params.hospitalId;
        }
        if (params?.minPatientAge) {
            options.where['minPatientAge'] = params.minPatientAge;
        }
        if (params?.maxPatientAge) {
            options.where['maxPatientAge'] = params.maxPatientAge;
        }
        if (params?.treatmentLevel) {
            options.where['treatmentLevel'] = params.treatmentLevel;
        }
        if (params?.location) {
            options.where['location'] = params.location;
        }
        if (params?.gender) {
            options.where['gender'] = params.gender;
        }

        return this.wardsService.findAll(options);
    }

    @Get('/treatment_levels')
    @ApiResponse({
        status: 200,
        description: 'Get all treatment levels',
        type: [TreatmentLevel]
    })
    async getTreatmentLevels(): Promise<TreatmentLevel[]> {
        return this.wardsService.getTreatmentLevels();
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'Create a new ward',
        type: CreateWardDto
    })
    @Roles(Role.Admin)
    async createWard(@Body() ward: CreateWardDto): Promise<Ward> {
        return this.wardsService.createWard(ward);
    }

    @Patch(':id')
    @ApiResponse({
        status: 200,
        description: 'Update ward properties by ID',
        type: Ward
    })
    @Roles(Role.Admin)
    async updateWard(
        @Param('id') id: number,
        @Body() ward: UpdateWardDto
    ): Promise<Ward> {
        return this.wardsService.updateWard(id, ward);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Delete ward by ID',
        type: Ward
    })
    @Roles(Role.Admin)
    async deleteWard(@Param('id') id: number): Promise<string> {
        return this.wardsService.deleteWard(id);
    }
}
