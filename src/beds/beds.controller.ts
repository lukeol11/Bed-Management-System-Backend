import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { BedsService } from './beds.service';
import { CreateBedDto } from './dto/create-bed.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Bed } from './entities/bed.entity';
import { DisabledReason } from './entities/disabled-reasons.entity';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { BedQueryParamsDto } from './dto/query-params.dto';
import { FindManyOptions } from 'typeorm';
dotenv.config();

export enum BedStatus {
    Enabled = 'enabled',
    Disabled = 'disabled'
}

@Roles(Role.User)
@ApiBearerAuth()
@Controller('api/beds')
@ApiTags('beds')
export class BedsController {
    constructor(private readonly bedsService: BedsService) {}

    @ApiResponse({
        status: 200,
        description: 'Get all beds',
        type: [Bed]
    })
    @Get()
    getAllBeds(@Param() params?: BedQueryParamsDto): Promise<Bed[]> {
        const options: FindManyOptions<Bed> = {
            where: {}
        };

        if (params?.id) {
            options.where['id'] = params.id;
        }
        if (params?.wardId) {
            options.where['wardId'] = params.wardId;
        }
        if (params?.roomId) {
            options.where['roomId'] = params.roomId;
        }
        if (params?.disabled !== undefined) {
            options.where['disabled'] = params.disabled;
        }

        return this.bedsService.getAllBeds(options);
    }

    @ApiResponse({
        status: 200,
        description: 'Delete bed by id',
        type: String
    })
    @Delete(':bedId')
    @Roles(Role.Admin)
    async deleteBedById(@Param('bedId') bedId: number): Promise<string> {
        return this.bedsService.deleteBedById(bedId);
    }

    @ApiQuery({
        name: 'reasonId',
        description: 'Required to disable bed',
        required: false,
        type: Number
    })
    @ApiOperation({
        summary: 'Update bed status to enabled or disabled'
    })
    @Roles(Role.Cleaner)
    @Patch('status/:bedId')
    updateBedStatus(
        @Param('bedId') bedId: number,
        @Query('status') status: BedStatus,
        @Query('reasonId') reasonId?: number
    ) {
        if (status === 'disabled') {
            if (!reasonId) {
                throw new HttpException(
                    'Reason ID is required to disable a bed',
                    HttpStatus.BAD_REQUEST
                );
            }
            return this.bedsService.disableBed(bedId, reasonId);
        } else if (status === 'enabled') {
            return this.bedsService.enableBed(bedId);
        } else {
            throw new HttpException(
                'Invalid status provided. Use "enabled" or "disabled".',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @ApiOperation({
        summary: 'Create a new bed'
    })
    @ApiResponse({
        status: 201,
        description: 'Create a new bed',
        type: Bed
    })
    @Roles(Role.Admin)
    @Post()
    async createBed(@Body() bed: CreateBedDto): Promise<Bed> {
        return this.bedsService.createBed(bed);
    }

    @Get('disabled_reasons')
    @ApiResponse({
        status: 200,
        description: 'Get all disabled reasons',
        type: DisabledReason,
        isArray: true
    })
    getDisabledReasons(): Promise<DisabledReason[]> {
        return this.bedsService.getDisabledReasons();
    }
}
