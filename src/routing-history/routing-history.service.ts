import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutingHistory } from './entities/routing-history.entity';
import { CreateRoutingHistoryDto } from './dto/createRoutingHistory';
import { Repository } from 'typeorm';
import { Between } from 'typeorm';

@Injectable()
export class RoutingHistoryService {
    constructor(
        @InjectRepository(RoutingHistory)
        private routingHistoryRepository: Repository<RoutingHistory>
    ) {}

    async addRoutingHistory(
        routingHistory: CreateRoutingHistoryDto
    ): Promise<RoutingHistory> {
        return this.routingHistoryRepository.save(routingHistory);
    }

    async getRoutingHistory(
        startDate: Date,
        endDate: Date,
        userId: number
    ): Promise<RoutingHistory[]> {
        const results = await this.routingHistoryRepository.find({
            where: {
                timestamp: Between(startDate, endDate),
                user_id: userId
            }
        });

        return results;
    }
}
