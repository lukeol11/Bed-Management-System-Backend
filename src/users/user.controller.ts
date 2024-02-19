import { Controller, Get } from '@nestjs/common';
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
}
