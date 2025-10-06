import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
    HealthCheck,
    HealthCheckService,
    TypeOrmHealthIndicator
} from '@nestjs/terminus';
import { FirebaseHealthIndicator } from './auth/firebase.health';

@ApiBearerAuth()
@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly db: TypeOrmHealthIndicator,
        private readonly firebase: FirebaseHealthIndicator
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.db.pingCheck('database'),
            () => this.firebase.isHealthy()
        ]);
    }
}

