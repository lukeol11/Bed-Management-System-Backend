import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/wards/entities/ward.entity';

@Entity('rooms')
export class Room {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @Column({ name: 'ward_id' })
    wardId: number;

    @ApiProperty({ enum: Gender })
    @Column({
        type: 'enum',
        enum: [Gender]
    })
    gender: Gender;
}
