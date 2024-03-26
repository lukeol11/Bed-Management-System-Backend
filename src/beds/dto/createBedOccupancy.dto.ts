import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDate } from 'class-validator';

export class CreateBedOccupancyDto {
    @ApiProperty()
    @IsInt()
    patient_id: number;

    @ApiProperty()
    @IsInt()
    bed_id: number;

    @ApiProperty()
    @IsDate()
    time_booked: Date;

    @ApiProperty()
    @IsInt()
    created_by: number;

    @ApiProperty()
    @IsDate()
    created_at: Date;
}
