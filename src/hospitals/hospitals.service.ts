import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Hospital } from './entities/hospital.entity';

@Injectable()
export class HospitalsService {
    constructor(
        @InjectRepository(Hospital)
        private readonly hospitalsRepository: Repository<Hospital>
    ) {}

    async find(params?: FindManyOptions<Hospital>): Promise<Hospital[]> {
        return this.hospitalsRepository.find(params);
    }
}
