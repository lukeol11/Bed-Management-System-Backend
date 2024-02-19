import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';

@Controller('/api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/all')
    async getAllUsers(): Promise<Users[]> {
        return this.usersService.findAll();
    }
}
