import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { BookingRequest } from './entities/booking_request.entity';
import { BookingRequestDto } from './dto/booking_requests.dto';
import { BookingApprovedDto } from './dto/booking_approved.dto';

@Injectable()
export class TransfersService {
    constructor(
        @InjectRepository(BookingRequest)
        private transfersRepository: Repository<BookingRequest>
    ) {}

    async findAll(hospitalId?: number): Promise<BookingRequestDto[]> {
        if (hospitalId) {
            return this.transfersRepository.find({
                where: { hospitalId: hospitalId }
            });
        } else {
            return this.transfersRepository.find();
        }
    }

    async createTransfer(
        transfer: BookingRequestDto
    ): Promise<BookingRequestDto> {
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
    ): Promise<BookingApprovedDto> {
        const transfer = await this.transfersRepository.findOne({
            where: { id: approval.id }
        });
        transfer.approvedBy = approval.approvedBy;
        transfer.approvedAt = approval.approvedAt;
        transfer.bedApproved = approval.bedApproved;
        return this.transfersRepository.save(transfer);
    }

    async delete(id: number): Promise<string> {
        await this.transfersRepository.delete(id);
        return `Transfer ${id} has been deleted`;
    }
}
