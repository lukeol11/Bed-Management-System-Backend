import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoutingHistoryService } from './routing-history.service';
import { RoutingHistory } from './entities/routing-history.entity';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/enums/role.enum';

@Roles(Role.Admin)
@ApiBearerAuth()
@Controller('/api/routing-history')
@ApiTags('routing-history')
export class RoutingHistoryController {
    constructor(
        private readonly routingHistoryService: RoutingHistoryService
    ) {}

    @Get()
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
