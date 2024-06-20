import {
    Body,
    Headers,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('/api/users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/all')
    @ApiResponse({
        status: 200,
        description: 'Get all users or filter by hospital ID',
        type: UserDto,
        isArray: true
    })
    @ApiQuery({
        name: 'hospital_id',
        required: false,
        type: Number
    })
    async getAllUsers(
        @Query('hospital_id') hospitalId?: number
    ): Promise<UserDto[]> {
        return this.usersService.findAll(hospitalId);
    }

    @Get('/find')
    @ApiResponse({
        status: 200,
        description: 'Find user by id or email',
        type: UserDto
    })
    @ApiQuery({
        name: 'id',
        required: false,
        type: Number
    })
    @ApiQuery({
        name: 'email',
        required: false,
        type: String
    })
    async findUser(
        @Query('id') id?: number,
        @Query('email') email?: string
    ): Promise<UserDto> {
        if (id) {
            return this.usersService.findById(id);
        } else if (email) {
            return this.usersService.findByEmail(email);
        } else {
            throw new Error(
                'You must provide either an ID or an email to find a user.'
            );
        }
    }

    @Post('/create')
    @ApiResponse({
        status: 201,
        description: 'Create a new user',
        type: UserDto
    })
    async createUser(
        @Body() user: UserDto,
        @Headers('email') email?: string
    ): Promise<UserDto> {
        const requestingUser = await this.usersService.findByEmail(email);
        if (
            (requestingUser?.can_administrate &&
                user.hospital_id === requestingUser.hospital_id) ||
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
        ) {
            return this.usersService.createUser(user);
        } else {
            throw new HttpException(
                'Unauthorized access',
                HttpStatus.UNAUTHORIZED
            );
        }
    }

    @Delete('/delete/:id')
    @ApiResponse({
        status: 200,
        description: 'Delete a user by ID',
        type: User
    })
    async deleteUser(
        @Param('id') id: number,
        @Headers('email') email?: string
    ): Promise<string> {
        const requestingUser = await this.usersService.findByEmail(email);
        const user = await this.usersService.findById(id);

        if (
            (requestingUser?.can_administrate &&
                user.hospital_id === requestingUser.hospital_id) ||
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
        ) {
            return this.usersService.delete(id);
        } else {
            throw new HttpException(
                'Unauthorized access',
                HttpStatus.UNAUTHORIZED
            );
        }
    }
}
