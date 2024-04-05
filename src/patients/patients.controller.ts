import {
    Controller,
    Get,
    Query,
    Delete,
    Param,
    Patch,
    Body,
    Post
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientDto } from './dto/patient.dto';
import { Patient } from './entities/patient.entity';

@Controller('/api/patients')
@ApiTags('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) {}

    @Get('/all')
    @ApiResponse({
        status: 200,
        description: 'Get all patients',
        type: PatientDto,
        isArray: true
    })
    async getAllPatients() {
        return this.patientsService.findAll();
    }

    @Get('/find')
    @ApiResponse({
        status: 200,
        description: 'Get patient by ID',
        type: PatientDto
    })
    async getPatientById(@Query('id') id: number): Promise<PatientDto> {
        return this.patientsService.findPatientById(id);
    }

    @Delete('/delete/:id')
    @ApiResponse({
        status: 200,
        description: 'Delete patient by ID',
        type: Patient
    })
    async deletePatient(@Param('id') id: number): Promise<string> {
        return this.patientsService.deletePatient(id);
    }

    @Patch('/update/:id')
    @ApiResponse({
        status: 200,
        description: 'Update patient properties by ID',
        type: PatientDto
    })
    async updateWard(
        @Param('id') id: number,
        @Body() patient: PatientDto
    ): Promise<PatientDto> {
        return this.patientsService.updatePatient(id, patient);
    }

    @Post('/create')
    @ApiResponse({
        status: 201,
        description: 'Create a new patient',
        type: PatientDto
    })
    async createPatient(@Body() patient: PatientDto): Promise<Patient> {
        return this.patientsService.createPatient(patient);
    }
}

