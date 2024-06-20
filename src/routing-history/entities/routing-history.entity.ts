import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';

@Entity('routing_history')
export class RoutingHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column()
    user_id: number;

    @CreateDateColumn()
    timestamp: Date;
}
