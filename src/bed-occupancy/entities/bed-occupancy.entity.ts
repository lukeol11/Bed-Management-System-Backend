import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bed_occupancy')
export class BedOccupancy {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ name: 'patient_id' })
    patientId: number;

    @ApiProperty()
    @Column({ name: 'bed_id' })
    bedId: number;

    @ApiProperty()
    @Column({ name: 'time_booked' })
    timeBooked: Date;

    @ApiProperty()
    @Column({ name: 'checkout_time', nullable: true })
    checkoutTime: Date;

    @ApiProperty()
    @Column({ name: 'created_by' })
    createdBy: number;

    @ApiProperty()
    @Column({ name: 'created_at' })
    createdAt: Date;
}
