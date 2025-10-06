import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDate, IsEnum } from 'class-validator';
import { Gender } from 'src/wards/entities/ward.entity';

export class CreateRoomDto {
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsInt()
    wardId: number;

    @ApiProperty()
    @IsEnum(Gender)
    gender: Gender;
}
