import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsNotEmpty } from 'class-validator';
import { Gender } from '../entities/ward.entity';

export class WardQueryParamsDto {
    @ApiProperty({
        required: false
    })
    @IsInt()
    id?: number;

    @ApiProperty({
        required: false
    })
    @IsInt()
    minPatientAge?: number;

    @ApiProperty({
        required: false
    })
    @IsInt()
    maxPatientAge?: number;

    @ApiProperty({
        required: false
    })
    @IsInt()
    treatmentLevel?: number;

    @ApiProperty({
        required: false
    })
    @IsInt()
    location?: number;

    @ApiProperty({
        required: false,
        enum: Gender
    })
    @IsEnum(Gender)
    gender?: Gender;

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    @IsInt()
    hospitalId: number;
}
