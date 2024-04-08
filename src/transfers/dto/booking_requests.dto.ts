import { IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookingRequestDto {
    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsNumber()
    createdBy: number;

    @ApiProperty()
    @IsNumber()
    currentBed: number;

    @ApiProperty()
    @IsNumber()
    bedRequested: number;

    @ApiProperty()
    @IsNumber()
    hospitalId: number;

    @ApiProperty()
    @IsNumber()
    patientId: number;
}
