import {
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { BedOccupancy } from 'src/bed-occupancy/entities/bed-occupancy.entity';
import { CreateBedOccupancyDto } from './dto/create-bed-occupancy.dto';
import { BedsService } from 'src/beds/beds.service';
import { UpdateBedOccupancyDto } from './dto/update-bed-occupancy.dto';
import { RequestType, TransfersService } from 'src/transfers/transfers.service';

@Injectable()
export class BedOccupancyService {
    constructor(
        @InjectRepository(BedOccupancy)
        private readonly bedOccupancyRepository: Repository<BedOccupancy>,
        @Inject(forwardRef(() => BedsService))
        private readonly bedService: BedsService,
        @Inject(forwardRef(() => TransfersService))
        private readonly transfersService: TransfersService
    ) {}

    async createBedOccupancy(
        dto: CreateBedOccupancyDto
    ): Promise<BedOccupancy> {
        let occupancy: BedOccupancy = null;
        const beds = await this.bedService.getAllBeds({
            where: { id: dto.bedId }
        });
        if (!beds?.[0]?.disabled) {
            this.bedService.disableBed(dto.bedId, 2); // disabledReason id 2 needs to be = 'Occupied'
            occupancy = this.bedOccupancyRepository.create(dto);
            await this.bedOccupancyRepository.save(occupancy);
        } else {
            throw new HttpException('Bed is disabled', HttpStatus.CONFLICT);
        }
        return occupancy;
    }

    async getBedOccupancy(
        params?: FindManyOptions<BedOccupancy>
    ): Promise<BedOccupancy[]> {
        return this.bedOccupancyRepository.find(params);
    }

    async updateBedOccupancy(
        params: UpdateBedOccupancyDto
    ): Promise<BedOccupancy> {
        if (params?.checkoutTime) {
            const pendingTransfers = await this.transfersService.findRequests({
                patientId: params?.patientId,
                type: RequestType.Pending
            });
            pendingTransfers.forEach((transfer) => {
                console.info('Deleting transfer', transfer.id);
                this.transfersService.delete(transfer.id);
            });

            this.bedService.disableBed(params?.bedId, 1); // disabledReason id 1 needs to be = 'Cleaning'
        }
        return this.bedOccupancyRepository.save(params);
    }
}
