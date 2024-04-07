import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bed } from './entities/bed.entity';
import { BedOccupancy } from './entities/bedOccupancy.entity';
import { CreateBedOccupancyDto } from './dto/createBedOccupancy.dto';
import { CheckoutBedOccupancyDto } from './dto/checkoutBedOccupancy.dto';
import { BedDto } from './dto/Bed.dto';

@Injectable()
export class BedsService {
    constructor(
        @InjectRepository(Bed)
        private bedsRepository: Repository<Bed>,
        @InjectRepository(BedOccupancy)
        private bedOccupancyRepository: Repository<BedOccupancy>
    ) {}

    async getBedStatus(ward_id: number): Promise<any[]> {
        const beds = await this.bedsRepository.find({
            where: { ward_id: ward_id }
        });

        const bedStatuses = await Promise.all(
            beds.map(async (bed) => {
                const occupancy = await this.bedOccupancyRepository
                    .createQueryBuilder('occupancy')
                    .where('occupancy.bed_id = :bed_id', { bed_id: bed.id })
                    .andWhere('occupancy.checkout_time IS NULL')
                    .getOne();

                return {
                    id: bed.id,
                    disabled: bed.disabled,
                    occupied: occupancy ? true : false
                };
            })
        );

        return bedStatuses;
    }

    async disableBed(bed_id: number): Promise<string> {
        await this.bedsRepository.update(bed_id, { disabled: true });
        return 'Bed disabled successfully';
    }

    async enableBed(bed_id: number): Promise<string> {
        await this.bedsRepository.update(bed_id, { disabled: false });
        return 'Bed enabled successfully';
    }

    async createBed(bed: BedDto): Promise<BedDto> {
        return this.bedsRepository.save(bed);
    }

    async getBedById(bed_id: number): Promise<Bed> {
        return this.bedsRepository.findOne({
            where: { id: bed_id }
        });
    }

    async deleteBedById(bed_id: number): Promise<string> {
        await this.bedsRepository.delete(bed_id);
        return 'Bed deleted successfully';
    }

    async getAllBeds(ward_id: number): Promise<Bed[]> {
        return this.bedsRepository.find({
            where: { ward_id }
        });
    }

    async getActiveBedOccupancy(bed_id: number): Promise<BedOccupancy[]> {
        return this.bedOccupancyRepository
            .createQueryBuilder('occupancy')
            .where('occupancy.bed_id = :bed_id', { bed_id })
            .andWhere('occupancy.checkout_time IS NULL')
            .getMany();
    }

    async createBedOccupancy(
        dto: CreateBedOccupancyDto
    ): Promise<BedOccupancy> {
        const occupancy = this.bedOccupancyRepository.create(dto);
        await this.bedOccupancyRepository.save(occupancy);
        return occupancy;
    }

    async checkoutBedOccupancy(
        dto: CheckoutBedOccupancyDto,
        bed_id?: number,
        patient_id?: number
    ): Promise<string> {
        const queryBuilder = this.bedOccupancyRepository
            .createQueryBuilder()
            .update()
            .set({ checkout_time: dto.checkout_time })
            .where('checkout_time IS NULL');

        if (bed_id) {
            queryBuilder.andWhere('bed_id = :bed_id', { bed_id });
        }

        if (patient_id) {
            queryBuilder.andWhere('patient_id = :patient_id', { patient_id });
        }

        await queryBuilder.execute();
        return 'Checked out successfully';
    }
}
