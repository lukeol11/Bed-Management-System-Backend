import {
    IsString,
    IsBoolean,
    IsNumber,
    IsEmail,
    IsDate
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsBoolean()
    can_approve_requests: boolean;

    @IsNumber()
    hospital_id: number;

    @IsEmail()
    email: string;

    @IsString()
    phone_number: string;

    @IsDate()
    created_at: Date;

    @IsNumber()
    created_by: number;
}
