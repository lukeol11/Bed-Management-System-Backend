import { Injectable } from '@nestjs/common';
import { WardDto } from './dto/ward.dto';
import { Ward } from './entities/ward.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
}
