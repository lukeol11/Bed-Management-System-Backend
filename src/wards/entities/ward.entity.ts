import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    ALL = 'All'
}
@Entity('wards')
export class Ward {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column({ name: 'min_patient_age' })
    minPatientAge: number;

    @ApiProperty()
    @Column({ name: 'max_patient_age' })
    maxPatientAge: number;

    @ApiProperty()
    @Column({ name: 'treatment_level' })
    treatmentLevel: number;

    @ApiProperty()
    @Column()
    location: number;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: Gender
    })
    gender: Gender;

    @ApiProperty()
    @Column({ name: 'hospital_id' })
    hospitalId: number;
}
