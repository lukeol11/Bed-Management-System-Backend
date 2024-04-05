import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDate, IsBoolean } from 'class-validator';

export class BedDto {
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsDate()
    created_at: Date;

    @ApiProperty()
    @IsDate()
    updated_at: Date;

    @ApiProperty()
    @IsInt()
    ward_id: number;

    @ApiProperty()
    @IsBoolean()
    disabled: boolean;
}
