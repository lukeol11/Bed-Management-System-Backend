import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsEnum } from 'class-validator';
import { Gender } from '../entities/ward.entity';

export class CreateWardDto {
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsInt()
    minPatientAge: number;

    @ApiProperty()
    @IsInt()
    maxPatientAge: number;

    @ApiProperty()
    @IsInt()
    treatmentLevel: number;

    @ApiProperty()
    @IsInt()
    location: number;

    @ApiProperty()
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty()
    @IsInt()
    hospitalId: number;
}

