import { ApiProperty } from '@nestjs/swagger';
import { Room } from 'src/rooms/entities/room.entity';
import { DisabledReason } from './disabled-reasons.entity';
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
    @Column({ name: 'ward_id' })
    wardId: number;

    @ApiProperty()
    @Column({ name: 'room_id', nullable: true })
    roomId: number;

    @ApiProperty()
    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_id' })
    room: Room;

    @ApiProperty()
    @Column()
    disabled: boolean;

    @ApiProperty()
    @Column({ name: 'updated_at' })
    updatedAt: Date;

    @ApiProperty()
    @Column({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @Column({ name: 'disabled_reason_id', nullable: true })
    disabledReasonId: number;

    @ApiProperty()
    @ManyToOne(() => DisabledReason)
    @JoinColumn({ name: 'disabled_reason_id' })
    disabledReason: DisabledReason;
}
