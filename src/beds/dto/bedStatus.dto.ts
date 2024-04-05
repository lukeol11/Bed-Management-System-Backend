import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class BedStatusDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsBoolean()
    disabled: boolean;

    @ApiProperty()
    @IsBoolean()
    occupied: boolean;
}
