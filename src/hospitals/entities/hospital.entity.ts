import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hospitals')
export class Hospital {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    location: string;
}
