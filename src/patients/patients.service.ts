import { Injectable } from '@nestjs/common';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { PatientDto } from './dto/patient.dto';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private patientsRepository: Repository<Patient>
    ) {}

    async findAll(): Promise<PatientDto[]> {
        return this.patientsRepository.find();
    }

    async deletePatient(id: number): Promise<string> {
        await this.patientsRepository.delete(id);
        return 'Patient deleted';
    }

    async updatePatient(id: number, patient: Patient): Promise<PatientDto> {
        const currentPatient = await this.findPatientById(id);
        if (!currentPatient) {
            throw new Error('Patient not found');
        }

        await this.patientsRepository.update(id, patient);

        return this.findPatientById(id);
    }

    async findPatientById(id: number): Promise<PatientDto> {
        const options: FindOneOptions<Patient> = {
            where: { id: id }
        };
        return this.patientsRepository.findOne(options);
    }

    async createPatient(patient: Patient): Promise<PatientDto> {
        return this.patientsRepository.save(patient);
    }
}
