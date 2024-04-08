import { IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookingApprovedDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsDate()
    approvedAt: Date;

    @ApiProperty()
    @IsNumber()
    approvedBy: number;

    @ApiProperty()
    @IsNumber()
    bedApproved: number;
}
