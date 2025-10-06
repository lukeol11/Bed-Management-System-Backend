import { IsString, IsBoolean, IsNumber, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PatientGender } from '../entities/patient.entity';

export class CreatePatientDto {
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    dateOfBirth: string;

    @ApiProperty()
    @IsBoolean()
    inTransit: boolean;

    @ApiProperty()
    @IsNumber()
    createdBy: number;

    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsEnum(PatientGender)
    gender: PatientGender;

    @ApiProperty()
    @IsNumber()
    treatmentLevelId: number;
}
