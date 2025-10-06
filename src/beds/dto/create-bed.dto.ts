import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDate, IsBoolean } from 'class-validator';

export class CreateBedDto {
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    updatedAt: Date;

    @ApiProperty()
    @IsInt()
    wardId: number;

    @ApiProperty()
    @IsInt()
    roomId: number;

    @ApiProperty()
    @IsBoolean()
    disabled: boolean;
}
