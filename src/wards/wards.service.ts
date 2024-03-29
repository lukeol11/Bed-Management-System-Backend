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

    async findAll(hospitalId?: number): Promise<WardDto[]> {
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
            select: ['name', 'description', 'equipment']
        });
    }

    async findWardById(id: number): Promise<WardDto> {
        const options: FindOneOptions<Ward> = {
            where: { id: id }
        };
        return this.wardsRepository.findOne(options);
    }

    async updateWard(id: number, ward: UpdateWardDto): Promise<WardDto> {
        // Check if the ward exists
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

