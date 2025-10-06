import {
    IsString,
    IsNumber,
    IsEmail,
    IsDate,
    IsEnum,
    IsArray,
    ArrayNotEmpty,
    IsPhoneNumber
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsNumber()
    hospitalId: number;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsPhoneNumber('IE')
    phoneNumber: string;

    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsNumber()
    createdBy: number;

    @ApiProperty({ enum: Role, isArray: true, example: ['user', 'nurse'] })
    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(Role, { each: true })
    roles: Role[];
}
