import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    async createWard(@Body() user: UserDto): Promise<UserDto> {
        return this.usersService.createUser(user);
    }

    @Delete('/delete/:id')
    @ApiResponse({
        status: 200,
        description: 'Delete a user by ID',
        type: User
    })
    async deleteUser(@Param('id') id: number): Promise<string> {
        return this.usersService.delete(id);
    }
}

