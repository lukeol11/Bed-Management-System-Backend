import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDate } from 'class-validator';

export class CreateBedOccupancyDto {
    @ApiProperty()
    @IsInt()
    booking_request_id: number;

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
}
