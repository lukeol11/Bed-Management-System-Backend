import { IsString, IsBoolean, IsNumber, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatientDto {
    @ApiProperty()
    @IsString()
    first_name: string;

    @ApiProperty()
    @IsString()
    last_name: string;

    @ApiProperty()
    @IsString()
    date_of_birth: string;

    @ApiProperty()
    @IsBoolean()
    in_transit: boolean;

    @ApiProperty()
    @IsNumber()
    created_by: number;

    @ApiProperty()
    @IsDate()
    created_at: Date;

    @ApiProperty()
    @IsEnum({ Male: 'Male', Female: 'Female', Other: 'Other' })
    gender: 'Male' | 'Female' | 'Other';

    @ApiProperty()
    @IsNumber()
    treatment_level_id: number;
}
