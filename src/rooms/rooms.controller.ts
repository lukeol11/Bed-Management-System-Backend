import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Headers,
    Query,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { UsersService } from 'src/users/users.service';
import { WardsService } from 'src/wards/wards.service';
import { Room } from './entities/room.entity';
import {
    ApiBody,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { CreateRoomDto } from './dto/CreateRoom.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('api/rooms')
@ApiTags('rooms')
export class RoomsController {
    constructor(
        private readonly roomsService: RoomsService,
        private readonly usersService: UsersService,
        private readonly wardsService: WardsService
    ) {}

    // get all rooms
    @Get('all')
    @ApiResponse({
        status: 200,
        type: Room,
        isArray: true,
        description: 'Get all rooms'
    })
    @ApiQuery({
        name: 'ward_id',
        required: false,
        type: Number
    })
    async getAllRooms(@Query('ward_id') wardId?: number): Promise<Room[]> {
        if (wardId) {
            return this.roomsService.getRoomsByWardId(wardId);
        } else {
            return this.roomsService.getAllRooms();
        }
    }

    @Get('find')
    @ApiResponse({
        status: 200,
        type: Room,
        isArray: false,
        description: 'Get all rooms'
    })
    @ApiQuery({
        name: 'id',
        required: true,
        type: Number
    })
    async getRoomById(@Query('id') room_id: number): Promise<Room> {
        return this.roomsService.getRoomById(room_id);
    }

    @Delete('delete/:id')
    @ApiResponse({
        status: 200,
        description: 'Room deleted successfully'
    })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number
    })
    async deleteRoomById(
        @Param('id') room_id: number,
        @Headers('email') email?: string
    ): Promise<string> {
        const requestingUser = await this.usersService.findByEmail(email);
        const room = await this.roomsService.getRoomById(room_id);
        const ward = await this.wardsService.findWardById(room.ward_id);

        if (
            (requestingUser?.can_administrate &&
                ward.hospital_id === requestingUser.hospital_id) ||
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
        ) {
            return this.roomsService.deleteRoomById(room_id);
        } else {
            throw new HttpException(
                'Unauthorized access',
                HttpStatus.UNAUTHORIZED
            );
        }
    }

    @Post('create')
    @ApiResponse({
        status: 201,
        type: Room,
        description: 'Room created successfully'
    })
    @ApiBody({ type: CreateRoomDto })
    async createRoom(
        @Body() room: CreateRoomDto,
        @Headers('email') email?: string
    ): Promise<Room> {
        const requestingUser = await this.usersService.findByEmail(email);
        const ward = await this.wardsService.findWardById(room.ward_id);

        if (
            (requestingUser?.can_administrate &&
                ward.hospital_id === requestingUser.hospital_id) ||
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
        ) {
            return this.roomsService.createRoom(room);
        } else {
            throw new HttpException(
                'Unauthorized access',
                HttpStatus.UNAUTHORIZED
            );
        }
    }
}
