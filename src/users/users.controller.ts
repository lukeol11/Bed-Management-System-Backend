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
import { CreateUserDto } from './dto/create-user.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Roles } from './roles.decorator';
import { Role } from './enums/role.enum';
import { ROLE_HIERARCHY } from './role.utils';
import { UserQueryParamsDto } from './dto/query-params.dto';
import { FindManyOptions } from 'typeorm';

dotenv.config();

@Roles(Role.User)
@ApiBearerAuth()
@Controller('/api/users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @Roles(Role.Admin)
    @ApiResponse({
        status: 200,
        description: 'Get all users or filter by hospital ID',
        type: User,
        isArray: true
    })
    @ApiQuery({
        name: 'hospital_id',
        required: false,
        type: Number
    })
    async getAllUsers(@Query() params?: UserQueryParamsDto): Promise<User[]> {
        const options: FindManyOptions<User> = { where: {} };
        if (params?.hospitalId) {
            options.where['hospitalId'] = params.hospitalId;
        }
        if (params?.id) {
            options.where['id'] = params.id;
        }
        if (params?.phoneNumber) {
            options.where['phoneNumber'] = params.phoneNumber;
        }
        if (params?.email) {
            options.where['email'] = params.email;
        }
        if (params?.firstName) {
            options.where['firstName'] = params.firstName;
        }
        if (params?.lastName) {
            options.where['lastName'] = params.lastName;
        }

        return this.usersService.find(options);
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'Create a new user',
        type: CreateUserDto
    })
    @Roles(Role.Admin)
    async createUser(@Body() user: CreateUserDto): Promise<CreateUserDto> {
        return this.usersService.createUser(user);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Successfully deleted user',
        type: User
    })
    @Roles(Role.Admin)
    async deleteUser(@Param('id') id: number) {
        return this.usersService.delete(id);
    }

    @Get('roles')
    @ApiOperation({
        summary: 'Get all available roles',
        description:
            'Retrieve a list of all available user roles and the roles that they inherit from. These roles are not user-specific but represent the roles that can be assigned to users.'
    })
    @ApiResponse({
        status: 200,
        description: 'Get all roles',
        type: Object,
        isArray: true
    })
    async getAllRoles(): Promise<Record<Role, Role[]>> {
        return ROLE_HIERARCHY;
    }
}
