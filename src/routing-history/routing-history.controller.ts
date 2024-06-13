import { Body, Controller, Post } from '@nestjs/common';
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
}
