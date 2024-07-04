import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, IsNull, Not, Repository } from 'typeorm';
import { BookingRequest } from './entities/booking_request.entity';
import { BookingRequestDto } from './dto/booking_requests.dto';
import { BookingApprovedDto } from './dto/booking_approved.dto';
import { BedsService } from 'src/beds/beds.service';
import { BedOccupancy } from 'src/beds/entities/bedOccupancy.entity';

@Injectable()
export class TransfersService {
    constructor(
        @InjectRepository(BookingRequest)
        private transfersRepository: Repository<BookingRequest>,
        @Inject(forwardRef(() => BedsService))
        private readonly bedsService: BedsService
    ) {}

    async findAll(hospitalId?: number): Promise<BookingRequest[]> {
        if (hospitalId) {
            return this.transfersRepository.find({
                where: { hospitalId: hospitalId }
            });
        } else {
            return this.transfersRepository.find();
        }
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

    async findByPatientId(
        patientId: number,
        type: string
    ): Promise<BookingRequest[]> {
        if (type === 'approved') {
            return this.transfersRepository.find({
                where: { patientId: patientId, approvedBy: Not(IsNull()) }
            });
        } else if (type === 'pending') {
            return this.transfersRepository.find({
                where: { patientId: patientId, approvedBy: IsNull() }
            });
        } else {
            return this.transfersRepository.find({
                where: { patientId: patientId }
            });
        }
    }

    async findByCreatedById(
        created_by: number,
        type: string
    ): Promise<BookingRequest[]> {
        if (type === 'approved') {
            return this.transfersRepository.find({
                where: { createdBy: created_by, approvedBy: Not(IsNull()) }
            });
        } else if (type === 'pending') {
            return this.transfersRepository.find({
                where: { createdBy: created_by, approvedBy: IsNull() }
            });
        } else {
            return this.transfersRepository.find({
                where: { createdBy: created_by }
            });
        }
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
        try {
            // mark transfer as approved
            updatedTransfer = await this.transfersRepository.save(transfer);
            // checkout the patient from current bed
            const checkoutResponse: string =
                await this.bedsService.checkoutBedOccupancy(
                    {
                        checkout_time: approval.approvedAt
                    },
                    transfer.currentBed,
                    transfer.patientId
                );
            if (checkoutResponse !== 'Checked out successfully') {
                throw new Error('Error checking out patient');
            }
            // assign the patient to the new bed
            const createOccupancyResponse: BedOccupancy =
                await this.bedsService.createBedOccupancy({
                    bed_id: approval.bedApproved,
                    patient_id: transfer.patientId,
                    created_at: approval.approvedAt,
                    created_by: approval.approvedBy,
                    time_booked: transfer.approvedAt
                });
            if (!createOccupancyResponse?.id) {
                throw new Error('Error creating bed occupancy');
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
        return updatedTransfer;
    }

    async delete(id: number): Promise<string> {
        await this.transfersRepository.delete(id);
        return `Transfer ${id} has been deleted`;
    }
}
