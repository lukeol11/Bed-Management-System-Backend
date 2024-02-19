import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('treatment_levels')
export class TreatmentLevel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    equipment: string;
}
