import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoutingHistoryDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    method: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    request: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
