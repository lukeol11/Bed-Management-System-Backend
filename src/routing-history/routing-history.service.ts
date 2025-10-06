import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutingHistory } from './entities/routing-history.entity';
import { CreateRoutingHistoryDto } from './dto/createRoutingHistory';
import { Repository, Between } from 'typeorm';

@Injectable()
export class RoutingHistoryService {
    constructor(
        @InjectRepository(RoutingHistory)
        private readonly routingHistoryRepository: Repository<RoutingHistory>
    ) {}

    addRoutingHistory(routingHistory: CreateRoutingHistoryDto) {
        this.routingHistoryRepository.insert(routingHistory);
    }

    async getRoutingHistory(
        startDate: Date,
        endDate: Date,
        userId: number
    ): Promise<RoutingHistory[]> {
        const results = await this.routingHistoryRepository.find({
            where: {
                timestamp: Between(startDate, endDate),
                userId
            }
        });

        return results;
    }
}
