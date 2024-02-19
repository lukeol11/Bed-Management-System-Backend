import {
    IsString,
    IsBoolean,
    IsNumber,
    IsEmail,
    IsDate
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    first_name: string;

    @ApiProperty()
    @IsString()
    last_name: string;

    @ApiProperty()
    @IsBoolean()
    can_approve_requests: boolean;

    @ApiProperty()
    @IsNumber()
    hospital_id: number;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    phone_number: string;

    @ApiProperty()
    @IsDate()
    created_at: Date;

    @ApiProperty()
    @IsNumber()
    created_by: number;
}
