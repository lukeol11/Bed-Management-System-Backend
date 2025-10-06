import { ApiProperty } from '@nestjs/swagger';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';

@Entity('routing_history')
export class RoutingHistory {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    method: string;

    @ApiProperty()
    @Column()
    request: string;

    @ApiProperty()
    @Column({ name: 'user_id' })
    userId: number;

    @ApiProperty()
    @CreateDateColumn()
    timestamp: Date;
}
