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
    from: string;

    @ApiProperty()
    @Column()
    to: string;

    @ApiProperty()
    @Column()
    user_id: number;

    @ApiProperty()
    @CreateDateColumn()
    timestamp: Date;
}
