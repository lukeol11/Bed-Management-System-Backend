import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, IsNull, Not, Repository } from 'typeorm';
import { BookingRequest } from './entities/booking_request.entity';
import { BookingRequestDto } from './dto/booking_requests.dto';
import { BookingApprovedDto } from './dto/booking_approved.dto';
import { BedOccupancy } from 'src/bed-occupancy/entities/bed-occupancy.entity';
import { BedOccupancyService } from 'src/bed-occupancy/bed-occupancy.service';

export enum RequestType {
    Approved = 'approved',
    Pending = 'pending'
}

@Injectable()
export class TransfersService {
    constructor(
        @InjectRepository(BookingRequest)
        private readonly transfersRepository: Repository<BookingRequest>,
        @Inject(forwardRef(() => BedOccupancyService))
        private readonly bedOccupancyService: BedOccupancyService
    ) {}

    async findRequests(params?: {
        hospitalId?: number;
        patientId?: number;
        createdBy?: number;
        type?: RequestType;
    }): Promise<BookingRequest[]> {
        const where: Record<string, any> = {};

        if (params?.hospitalId) {
            where.hospitalId = params.hospitalId;
        }

        if (params?.patientId) {
            where.patientId = params.patientId;
        }

        if (params?.createdBy) {
            where.createdBy = params.createdBy;
        }

        if (params?.type === RequestType.Approved) {
            where.approvedBy = Not(IsNull());
        } else if (params?.type === RequestType.Pending) {
            where.approvedBy = IsNull();
        }

        return this.transfersRepository.find({ where });
    }

    async createTransfer(transfer: BookingRequestDto): Promise<BookingRequest> {
        return this.transfersRepository.save(transfer);
    }

    async findById(id: number): Promise<BookingRequestDto> {
        const options: FindOneOptions<BookingRequest> = {
            where: { id: id }
        };
        return this.transfersRepository.findOne(options);
    }

    async approveTransfer(
        approval: BookingApprovedDto
    ): Promise<BookingRequest> {
        const transfer = await this.transfersRepository.findOne({
            where: { id: approval.id }
        });
        transfer.approvedBy = approval.approvedBy;
        transfer.approvedAt = approval.approvedAt;
        transfer.bedApproved = approval.bedApproved;
        let updatedTransfer: BookingRequest;

        // mark transfer as approved
        updatedTransfer = await this.transfersRepository.save(transfer);
        // checkout the patient from current bed
        const occupancy = await this.bedOccupancyService.getBedOccupancy({
            where: {
                bedId: transfer.currentBed,
                patientId: transfer.patientId,
                checkoutTime: IsNull()
            }
        });
        const checkoutResponse =
            await this.bedOccupancyService.updateBedOccupancy({
                id: occupancy[0].id,
                checkoutTime: approval.approvedAt
            });
        if (!checkoutResponse) {
            throw new Error('Error checking out patient');
        }
        // assign the patient to the new bed
        const createOccupancyResponse: BedOccupancy =
            await this.bedOccupancyService.createBedOccupancy({
                bedId: approval.bedApproved,
                patientId: transfer.patientId,
                createdAt: approval.approvedAt,
                createdBy: approval.approvedBy,
                timeBooked: transfer.approvedAt
            });
        if (!createOccupancyResponse?.id) {
            throw new Error('Error creating bed occupancy');
        }

        return updatedTransfer;
    }

    async delete(id: number): Promise<string> {
        await this.transfersRepository.delete(id);
        return `Transfer ${id} has been deleted`;
    }
}
