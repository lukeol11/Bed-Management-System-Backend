import {
    Injectable,
    HttpException,
    HttpStatus,
    forwardRef,
    Inject
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Bed } from './entities/bed.entity';
import { CreateBedDto } from './dto/create-bed.dto';
import { DisabledReason } from './entities/disabled-reasons.entity';
import { BedOccupancyService } from 'src/bed-occupancy/bed-occupancy.service';

@Injectable()
export class BedsService {
    constructor(
        @InjectRepository(Bed)
        private readonly bedsRepository: Repository<Bed>,
        @InjectRepository(DisabledReason)
        private readonly disabledReasonsRepository: Repository<DisabledReason>,
        @Inject(forwardRef(() => BedOccupancyService))
        private readonly bedOccupancyService: BedOccupancyService
    ) {}

    /**
     * Sets a beds disabled status and reason.
     * @param bedId
     * @param reason_id
     * @returns
     */
    async disableBed(bedId: number, reason_id: number): Promise<string> {
        await this.bedsRepository.update(bedId, {
            disabledReasonId: reason_id,
            disabled: true
        });
        return 'Bed disabled successfully';
    }

    /**
     * Enables a bed if it is not currently occupied.
     * @param bedId
     * @returns
     */
    async enableBed(bedId: number): Promise<string> {
        const occupancies = await this.bedOccupancyService.getBedOccupancy({
            where: {
                bedId: bedId,
                checkoutTime: null
            }
        });
        if (!occupancies?.[0]) {
            await this.bedsRepository.update(bedId, {
                disabledReasonId: null,
                disabled: false
            });
            return 'Bed enabled successfully';
        } else {
            throw new HttpException(
                'Bed cannot be enabled as it is currently occupied',
                HttpStatus.CONFLICT
            );
        }
    }

    async createBed(bed: CreateBedDto): Promise<Bed> {
        return this.bedsRepository.save(bed);
    }

    async getAllBeds(params?: FindManyOptions<Bed>): Promise<Bed[]> {
        const fullOptions: FindManyOptions<Bed> = {
            where: { ...params?.where },
            relations: ['room', 'disabledReason'],
            order: params?.order,
            skip: params?.skip,
            take: params?.take
        };

        return this.bedsRepository.find(fullOptions);
    }

    async deleteBedById(bedId: number): Promise<string> {
        await this.bedsRepository.delete(bedId);
        return 'Bed deleted successfully';
    }

    async getDisabledReasons(): Promise<DisabledReason[]> {
        return this.disabledReasonsRepository.find();
    }
}
