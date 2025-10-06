import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RoomQueryParamsDto {
    @ApiProperty({
        description: 'Filter by ward ID',
        required: false
    })
    @IsNumber()
    @IsOptional()
    wardId?: number;

    @ApiProperty({
        description: 'Filter by room ID',
        required: false
    })
    @IsOptional()
    @IsNumber()
    roomId?: number;

    @ApiProperty({
        description: 'Filter by Gender',
        required: false
    })
    @IsOptional()
    @IsString()
    gender?: string;
}
