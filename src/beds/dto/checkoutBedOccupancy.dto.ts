import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';

export class CheckoutBedOccupancyDto {
    @ApiProperty({ required: false })
    @IsDate()
    @IsOptional()
    checkout_time?: Date;
}
