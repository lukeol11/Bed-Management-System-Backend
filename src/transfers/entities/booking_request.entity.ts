import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('booking_requests')
export class BookingRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    notes: string;

    @Column({ name: 'bed_approved', nullable: true })
    bedApproved: number;

    @Column({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'created_by' })
    createdBy: number;

    @Column({ name: 'approved_at', nullable: true })
    approvedAt: Date;

    @Column({ name: 'approved_by', nullable: true })
    approvedBy: number;

    @Column({ name: 'bed_requested' })
    bedRequested: number;

    @Column({ name: 'hospital_id' })
    hospitalId: number;

    @Column({ name: 'patient_id' })
    patientId: number;
}
