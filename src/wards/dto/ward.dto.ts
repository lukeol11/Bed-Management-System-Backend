import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsEnum, Min, Max } from 'class-validator';

export class WardDto {
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsInt()
    min_patient_age: number;

    @ApiProperty()
    @IsInt()
    max_patient_age: number;

    @ApiProperty()
    @IsInt()
    treatment_level: number;

    @ApiProperty()
    @IsInt()
    location: number;

    @ApiProperty()
    @IsEnum({ Male: 'Male', Female: 'Female', All: 'All' })
    gender: 'Male' | 'Female' | 'All';

    @ApiProperty()
    @IsInt()
    hospital_id: number;
}
