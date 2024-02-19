import { Injectable } from '@nestjs/common';
import { WardDto } from './dto/ward.dto';
import { Ward } from './entities/ward.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UpdateWardDto } from './dto/updateWard.dto';

@Injectable()
export class WardsService {
    constructor(
        @InjectRepository(Ward)
        private wardsRepository: Repository<Ward>
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
}
