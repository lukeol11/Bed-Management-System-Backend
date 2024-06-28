import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';
import { DisabledReason } from './disabledReasons.entity';
import { JoinColumn, ManyToOne } from 'typeorm';

export class BedStatus {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsBoolean()
    disabled: boolean;

    @ApiProperty()
    @ManyToOne(() => DisabledReason)
    @JoinColumn({ name: 'disabled_reason_id' })
    disabled_reason: DisabledReason;
}
