import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('rooms')
export class Room {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    created_at: Date;

    @ApiProperty()
    @Column()
    ward_id: number;

    @ApiProperty({ enum: ['Male', 'Female', 'All', 'Inherit'] })
    @Column({
        type: 'enum',
        enum: ['Male', 'Female', 'All', 'Inherit']
    })
    gender: 'Male' | 'Female' | 'All' | 'Inherit';
}
