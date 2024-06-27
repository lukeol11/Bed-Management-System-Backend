import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Hospital } from '../../hospitals/entities/hospital.entity';
import { TreatmentLevel } from './treatment-level.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('wards')
export class Ward {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    min_patient_age: number;

    @ApiProperty()
    @Column()
    max_patient_age: number;

    @ApiProperty()
    @Column()
    treatment_level: number;

    @ApiProperty()
    @Column()
    location: number;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: ['Male', 'Female', 'All']
    })
    gender: 'Male' | 'Female' | 'All';

    @ApiProperty()
    @Column()
    hospital_id: number;

    @ApiProperty()
    @ManyToOne(() => Hospital)
    @JoinColumn({ name: 'hospital_id' })
    hospital: Hospital;

    @ApiProperty()
    @ManyToOne(() => TreatmentLevel)
    @JoinColumn({ name: 'treatment_level' })
    treatmentLevel: TreatmentLevel;
}
