import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('beds')
export class Bed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    ward_id: number;

    @Column()
    disabled: boolean;

    @Column()
    updated_at: Date;

    @Column()
    created_at: Date;

    @Column({ nullable: true })
    disabled_reason_id: number;
}
