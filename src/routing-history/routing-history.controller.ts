import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoutingHistoryService } from './routing-history.service';
import { CreateRoutingHistoryDto } from './dto/createRoutingHistory';
import { RoutingHistory } from './entities/routing-history.entity';

@Controller('/api/routing-history')
@ApiTags('routingHistory')
export class RoutingHistoryController {
    constructor(
        private readonly routingHistoryService: RoutingHistoryService
    ) {}

    @Post('/add')
    @ApiResponse({
        status: 200,
        description: 'Add routing history',
        type: CreateRoutingHistoryDto
    })
    async addRoutingHistory(
        @Body() routingHistory: CreateRoutingHistoryDto
    ): Promise<RoutingHistory> {
        return this.routingHistoryService.addRoutingHistory(routingHistory);
    }

    @Get('/find')
    @ApiResponse({
        status: 200,
        description: 'Get routing history',
        type: RoutingHistory,
        isArray: true
    })
    async getRoutingHistory(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('userId') userId: string
    ): Promise<RoutingHistory[]> {
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);
        const parsedUserId = parseInt(userId, 10);

        return this.routingHistoryService.getRoutingHistory(
            parsedStartDate,
            parsedEndDate,
            parsedUserId
        );
    }
}
