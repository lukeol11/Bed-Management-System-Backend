import { IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BedQueryParamsDto {
    @ApiProperty({
        description: 'Filter by user ID',
        required: false
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        required: false
    })
    @IsNumber()
    wardId: number;

    @ApiProperty({
        required: false
    })
    @IsNumber()
    roomId: number;

    @ApiProperty({
        required: false
    })
    @IsBoolean()
    disabled: boolean;
}
