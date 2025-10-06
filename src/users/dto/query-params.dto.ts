import { IsString, IsNumber, IsEmail, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserQueryParamsDto {
    @ApiProperty({
        description: 'Filter by user ID',
        required: false
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'Filter by first name',
        required: false
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'Filter by last name',
        required: false
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'Filter by hospital ID',
        required: true
    })
    @IsNumber()
    hospitalId: number;

    @ApiProperty({
        description: 'Filter by email',
        required: false
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Filter by phone number',
        required: false,
        example: '+35312345678'
    })
    @IsPhoneNumber('IE')
    phoneNumber: string;
}
