import { Controller, Get, Query } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { Hospital } from './entities/hospital.entity';
dotenv.config();

@Roles(Role.User)
@ApiBearerAuth()
@Controller('/api/hospitals')
@ApiTags('hospitals')
export class HospitalsController {
    constructor(private readonly hospitalsService: HospitalsService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Get all hospitals',
        type: Hospital,
        isArray: true
    })
    async getAllHospitals(@Query() params: Hospital): Promise<Hospital[]> {
        const options: { where?: Partial<Hospital> } = { where: {} };
        if (params?.id) {
            options.where['id'] = params.id;
        }
        if (params?.description) {
            options.where['description'] = params.description;
        }
        if (params?.location) {
            options.where['location'] = params.location;
        }
        return this.hospitalsService.find(options);
    }
}
