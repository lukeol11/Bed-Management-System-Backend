import { Injectable } from '@nestjs/common';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientsRepository: Repository<Patient>
    ) {}

    async find(params?: FindManyOptions<Patient>): Promise<Patient[]> {
        return this.patientsRepository.find(params);
    }

    async deletePatient(id: number) {
        await this.patientsRepository.delete(id);
    }

    async updatePatient(
        id: number,
        patient: UpdatePatientDto
    ): Promise<Patient> {
        const patientQuery = {
            id,
            ...patient
        };
        return this.patientsRepository.save(patientQuery);
    }

    async createPatient(patient: CreatePatientDto): Promise<Patient> {
        return this.patientsRepository.save(patient);
    }
}
