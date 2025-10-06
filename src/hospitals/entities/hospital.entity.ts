import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hospitals')
export class Hospital {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'Hospital ID',
        required: false
    })
    id: number;

    @Column()
    @ApiProperty({
        description: 'Name of the hospital',
        required: false
    })
    description: string;

    @Column()
    @ApiProperty({
        description: 'Location of the hospital',
        required: false
    })
    location: string;
}
