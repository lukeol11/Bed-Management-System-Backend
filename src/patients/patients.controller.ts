import {
    Controller,
    Get,
    Delete,
    Param,
    Patch,
    Body,
    Post,
    Query
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { FindManyOptions } from 'typeorm';
import { PatientQueryParamsDto } from './dto/query-params.dto';

@Roles(Role.Doctor, Role.Nurse, Role.BedManager)
@ApiBearerAuth()
@Controller('/api/patients')
@ApiTags('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Get all patients',
        type: Patient,
        isArray: true
    })
    async getAllPatients(
        @Query() params?: PatientQueryParamsDto
    ): Promise<Patient[]> {
        const options: FindManyOptions<Patient> = { where: {} };

        if (params?.id) {
            options.where['id'] = params.id;
        }
        if (params?.firstName) {
            options.where['firstName'] = params.firstName;
        }
        if (params?.lastName) {
            options.where['lastName'] = params.lastName;
        }
        if (params?.dateOfBirth) {
            options.where['dateOfBirth'] = params.dateOfBirth;
        }
        if (params?.inTransit !== undefined) {
            options.where['inTransit'] = params.inTransit;
        }
        if (params?.gender) {
            options.where['gender'] = params.gender;
        }
        if (params?.treatmentLevelId) {
            options.where['treatmentLevelId'] = params.treatmentLevelId;
        }

        return this.patientsService.find();
    }

    @Delete(':id')
    async deletePatient(@Param('id') id: number) {
        this.patientsService.deletePatient(id);
    }

    @Patch(':id')
    @ApiResponse({
        status: 200,
        description: 'Update patient properties by ID',
        type: Patient
    })
    async updateWard(
        @Param('id') id: number,
        @Body() patient: UpdatePatientDto
    ): Promise<Patient> {
        return this.patientsService.updatePatient(id, patient);
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'Create a new patient',
        type: Patient
    })
    async createPatient(@Body() patient: CreatePatientDto): Promise<Patient> {
        return this.patientsService.createPatient(patient);
    }
}
