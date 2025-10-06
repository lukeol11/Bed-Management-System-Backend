import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDate } from 'class-validator';

export class CreateBedOccupancyDto {
    @ApiProperty()
    @IsInt()
    patientId: number;

    @ApiProperty()
    @IsInt()
    bedId: number;

    @ApiProperty()
    @IsDate()
    timeBooked: Date;

    @ApiProperty()
    @IsInt()
    createdBy: number;

    @ApiProperty()
    @IsDate()
    createdAt: Date;
}
