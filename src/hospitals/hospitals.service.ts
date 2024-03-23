import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Hospital } from './entities/hospital.entity';
import { HospitalDto } from './dto/hospital.dto';

@Injectable()
export class HospitalsService {
    constructor(
        @InjectRepository(Hospital)
        private hospitalsRepository: Repository<Hospital>
    ) {}

    async findAll(): Promise<HospitalDto[]> {
        return this.hospitalsRepository.find();
    }

    async findHospitalById(id: number): Promise<HospitalDto> {
        const options: FindOneOptions<Hospital> = {
            where: { id: id }
        };
        return this.hospitalsRepository.findOne(options);
    }

    async deleteHospital(id: number): Promise<string> {
        await this.hospitalsRepository.delete(id);
        return 'Hospital deleted';
    }
}

