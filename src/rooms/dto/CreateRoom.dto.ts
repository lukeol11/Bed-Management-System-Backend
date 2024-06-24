import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDate, IsEnum } from 'class-validator';

export class CreateRoomDto {
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsDate()
    created_at: Date;

    @ApiProperty()
    @IsInt()
    ward_id: number;

    @ApiProperty()
    @IsEnum({ Male: 'Male', Female: 'Female', All: 'All', Inherit: 'Inherit' })
    gender: 'Male' | 'Female' | 'All' | 'Inherit';
}
