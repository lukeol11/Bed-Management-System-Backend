import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { auth } from 'firebase-admin';

@Injectable()
export class FirebaseHealthIndicator {
    async isHealthy(key = 'firebase'): Promise<HealthIndicatorResult> {
        try {
            await auth().listUsers(1);

            return {
                [key]: {
                    status: 'up'
                }
            };
        } catch (error) {
            return {
                [key]: {
                    status: 'down',
                    message: error?.message ?? 'Firebase Auth unreachable'
                }
            };
        }
    }
}
