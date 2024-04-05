// id, name, description, equipment

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TreatmentLevelDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    equipment: string;
}
