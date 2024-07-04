// user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    first_name: string;

    @ApiProperty()
    @Column()
    last_name: string;

    @ApiProperty()
    @Column()
    can_approve_requests: boolean;

    @ApiProperty()
    @Column()
    can_administrate: boolean;

    @ApiProperty()
    @Column()
    hospital_id: number;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column()
    phone_number: string;

    @ApiProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ApiProperty()
    @Column()
    created_by: number;
}
