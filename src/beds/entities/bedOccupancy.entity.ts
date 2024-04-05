import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bed_occupancy')
export class BedOccupancy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    patient_id: number;

    @Column()
    bed_id: number;

    @Column()
    time_booked: Date;

    @Column({ nullable: true })
    checkout_time: Date;

    @Column()
    created_by: number;

    @Column()
    created_at: Date;
}
