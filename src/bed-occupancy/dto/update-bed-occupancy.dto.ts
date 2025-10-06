import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDate, IsOptional } from 'class-validator';

export class UpdateBedOccupancyDto {
    @ApiProperty({
        required: true
    })
    @IsInt()
    id: number;

    @ApiProperty({
        required: false
    })
    @IsInt()
    patientId?: number;

    @ApiProperty({
        required: false
    })
    @IsInt()
    bedId?: number;

    @ApiProperty({
        required: false
    })
    @IsDate()
    timeBooked?: Date;

    @ApiProperty({ required: false })
    @IsDate()
    @IsOptional()
    checkoutTime?: Date;
}
