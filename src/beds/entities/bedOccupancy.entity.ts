import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bed_occupancy')
export class BedOccupancy {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    patient_id: number;

    @ApiProperty()
    @Column()
    bed_id: number;

    @ApiProperty()
    @Column()
    time_booked: Date;

    @ApiProperty()
    @Column({ nullable: true })
    checkout_time: Date;

    @ApiProperty()
    @Column()
    created_by: number;

    @ApiProperty()
    @Column()
    created_at: Date;
}
