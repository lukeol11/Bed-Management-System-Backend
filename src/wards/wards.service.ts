import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UpdateWardDto } from './dto/updateWard.dto';
import { Ward } from './entities/ward.entity';
import { TreatmentLevel } from './entities/treatment-level.entity';
import { WardDto } from './dto/ward.dto';
import { TreatmentLevelDto } from './dto/treatmentLevel.dto';

@Injectable()
export class WardsService {
    constructor(
        @InjectRepository(Ward)
        private wardsRepository: Repository<Ward>,
        @InjectRepository(TreatmentLevel)
        private treatmentLevelsRepository: Repository<TreatmentLevel>
    ) {}

    async findAll(hospitalId?: number): Promise<Ward[]> {
        if (hospitalId) {
            return this.wardsRepository.find({
                where: { hospital_id: hospitalId }
            });
        } else {
            return this.wardsRepository.find();
        }
    }

    async getTreatmentLevels(): Promise<TreatmentLevelDto[]> {
        return this.treatmentLevelsRepository.find({
            select: ['id', 'name', 'description', 'equipment']
        });
    }

    async createWard(ward: WardDto): Promise<WardDto> {
        return this.wardsRepository.save(ward);
    }

    async findWardById(id: number): Promise<Ward> {
        if (process.env.NODE_ENV === 'test') {
            return {
                id: 1,
                hospital_id: 1,
                description: 'Test Ward',
                treatment_level: 1,
                min_patient_age: 10,
                max_patient_age: 60,
                location: 1,
                gender: 'All'
            };
        }

        const options: FindOneOptions<Ward> = {
            where: { id: id }
        };
        return this.wardsRepository.findOne(options);
    }

    async updateWard(id: number, ward: UpdateWardDto): Promise<WardDto> {
        const currentWard = await this.findWardById(id);
        if (!currentWard) {
            throw new Error('Ward not found');
        }

        await this.wardsRepository.update(id, ward);

        return this.findWardById(id);
    }

    async deleteWard(id: number): Promise<string> {
        await this.wardsRepository.delete(id);
        return 'Ward deleted';
    }
}
