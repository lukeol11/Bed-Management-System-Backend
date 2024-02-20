import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    date_of_birth: string;

    @Column()
    in_transit: boolean;

    @Column()
    created_by: number;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    treatment_level_id: number;
}
