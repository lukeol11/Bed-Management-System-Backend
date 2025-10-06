import { IsDateString } from 'class-validator';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';

export enum PatientGender {
    OTHER = 'Other',
    MALE = 'Male',
    FEMALE = 'Female'
}

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'date_of_birth' })
    @IsDateString()
    dateOfBirth: string;

    @Column({ name: 'in_transit' })
    inTransit: boolean;

    @Column({ name: 'created_by' })
    createdBy: number;

    @Column({
        type: 'enum',
        enum: PatientGender
    })
    gender: PatientGender;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'treatment_level_id' })
    treatmentLevelId: number;
}
