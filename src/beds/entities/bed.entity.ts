import { ApiProperty } from '@nestjs/swagger';
import { Room } from 'src/rooms/entities/room.entity';
import { DisabledReason } from './disabledReasons.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

@Entity('beds')
export class Bed {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    ward_id: number;

    @ApiProperty()
    @Column({ nullable: true })
    room_id: number;

    @ApiProperty()
    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_id' })
    room: Room;

    @ApiProperty()
    @Column()
    disabled: boolean;

    @ApiProperty()
    @Column()
    updated_at: Date;

    @ApiProperty()
    @Column()
    created_at: Date;

    @ApiProperty()
    @Column({ nullable: true })
    disabled_reason_id: number;

    @ApiProperty()
    @ManyToOne(() => DisabledReason)
    @JoinColumn({ name: 'disabled_reason_id' })
    disabled_reason: DisabledReason;
}
