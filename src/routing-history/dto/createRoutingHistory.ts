import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoutingHistoryDto {
    @ApiProperty()
    @IsString()
    to: string;

    @ApiProperty()
    @IsString()
    from: string;

    @ApiProperty()
    @IsNumber()
    user_id: number;
}
