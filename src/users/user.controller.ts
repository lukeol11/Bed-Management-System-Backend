import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { UserDto } from './dto/users.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/all')
    @ApiResponse({
        status: 200,
        description: 'Get all users',
        type: UserDto,
        isArray: true
    })
    async getAllUsers(): Promise<Users[]> {
        return this.usersService.findAll();
    }

    @Get('/findById')
    @ApiResponse({
        status: 200,
        description: 'Get user by id',
        type: UserDto
    })
    async getUserById(@Param('id') id: number): Promise<Users> {
        return this.usersService.findById(id);
    }

    @Get('/findByEmail')
    @ApiResponse({
        status: 200,
        description: 'Get user by email',
        type: UserDto
    })
    async getUserByEmail(@Param('email') email: string): Promise<Users> {
        return this.usersService.findByEmail(email);
    }
}
