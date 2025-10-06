import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('booking_requests')
export class BookingRequest {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: true })
    notes: string;

    @ApiProperty()
    @Column({ name: 'bed_approved', nullable: true })
    bedApproved: number;

    @ApiProperty()
    @Column({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @Column({ name: 'created_by' })
    createdBy: number;

    @ApiProperty()
    @Column({ name: 'approved_at', nullable: true })
    approvedAt: Date;

    @ApiProperty()
    @Column({ name: 'approved_by', nullable: true })
    approvedBy: number;

    @ApiProperty()
    @Column({ name: 'current_bed' })
    currentBed: number;

    @ApiProperty()
    @Column({ name: 'bed_requested' })
    bedRequested: number;

    @ApiProperty()
    @Column({ name: 'hospital_id' })
    hospitalId: number; // todo: update name to currentHospitalId or requestedHospitalId

    @ApiProperty()
    @Column({ name: 'patient_id' })
    patientId: number;
}
