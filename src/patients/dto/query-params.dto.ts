import { IsString, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PatientGender } from '../entities/patient.entity';

export class PatientQueryParamsDto {
    @ApiProperty({
        description: 'Patient ID',
        required: false
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'Patient first name',
        required: false
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'Patient last name',
        required: false
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'Patient date of birth',
        required: false
    })
    @IsString()
    dateOfBirth: string;

    @ApiProperty({
        description: 'Indicates if the patient is in transit',
        required: false
    })
    @IsBoolean()
    inTransit: boolean;

    @ApiProperty({
        description: 'Gender of the patient',
        required: false,
        enum: PatientGender
    })
    @IsEnum(PatientGender)
    gender: PatientGender;

    @ApiProperty({
        description: 'Treatment level ID for the patient',
        required: false
    })
    @IsNumber()
    treatmentLevelId: number;
}
