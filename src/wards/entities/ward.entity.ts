import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Hospital } from '../../hospitals/entities/hospital.entity';
import { TreatmentLevel } from './treatment-level.entity';

@Entity('wards')
export class Ward {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    min_patient_age: number;

    @Column()
    max_patient_age: number;

    @Column()
    treatment_level: number;

    @Column()
    location: number;

    @Column({
        type: 'enum',
        enum: ['Male', 'Female', 'All']
    })
    gender: 'Male' | 'Female' | 'All';

    @Column()
    hospital_id: number;

    @ManyToOne(() => Hospital)
    @JoinColumn({ name: 'hospital_id' })
    hospital: Hospital;

    @ManyToOne(() => TreatmentLevel)
    @JoinColumn({ name: 'treatment_level' })
    treatmentLevel: TreatmentLevel;
}
