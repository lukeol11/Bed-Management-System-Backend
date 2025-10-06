import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UpdateWardDto } from './dto/update-ward.dto';
import { Ward } from './entities/ward.entity';
import { TreatmentLevel } from './entities/treatment-level.entity';
import { CreateWardDto } from './dto/create-ward.dto';

@Injectable()
export class WardsService {
    constructor(
        @InjectRepository(Ward)
        private readonly wardsRepository: Repository<Ward>,
        @InjectRepository(TreatmentLevel)
        private readonly treatmentLevelsRepository: Repository<TreatmentLevel>
    ) {}

    async findAll(options?: FindManyOptions<Ward>): Promise<Ward[]> {
        return this.wardsRepository.find(options);
    }

    async getTreatmentLevels(): Promise<TreatmentLevel[]> {
        return this.treatmentLevelsRepository.find({
            select: ['id', 'name', 'description', 'equipment']
        });
    }

    async createWard(ward: CreateWardDto): Promise<Ward> {
        return this.wardsRepository.save(ward);
    }

    async findWardById(id: number): Promise<Ward> {
        const options: FindOneOptions<Ward> = {
            where: { id: id }
        };
        return await this.wardsRepository.findOne(options);
    }

    async updateWard(id: number, ward: UpdateWardDto): Promise<Ward> {
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
