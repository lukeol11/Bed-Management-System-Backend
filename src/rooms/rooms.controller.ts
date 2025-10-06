import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import {
    ApiBearerAuth,
    ApiBody,
    ApiParam,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { CreateRoomDto } from './dto/create-room.dto';
import * as dotenv from 'dotenv';
import { Roles } from 'src/users/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { RoomQueryParamsDto } from './dto/query-params.dto';
import { FindManyOptions } from 'typeorm';
dotenv.config();

@Roles(Role.User)
@ApiBearerAuth()
@Controller('api/rooms')
@ApiTags('wards')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Get()
    @ApiResponse({
        status: 200,
        type: [Room],
        description: 'Get all rooms'
    })
    getAllRooms(@Query() params?: RoomQueryParamsDto): Promise<Room[]> {
        const options: FindManyOptions<Room> = {
            where: {}
        };
        if (params?.wardId) {
            options.where['wardId'] = params.wardId;
        }
        if (params?.roomId) {
            options.where['id'] = params.roomId;
        }
        if (params?.gender) {
            options.where['gender'] = params.gender;
        }

        return this.roomsService.getAllRooms(options);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        type: Room,
        description: 'Room deleted successfully'
    })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number
    })
    @Roles(Role.Admin)
    async deleteRoomById(@Param('id') room_id: number): Promise<Room> {
        return this.roomsService.deleteById(room_id);
    }

    @Post()
    @ApiResponse({
        status: 201,
        type: Room,
        description: 'Room created successfully'
    })
    @Roles(Role.Admin)
    @ApiBody({ type: CreateRoomDto })
    async createRoom(@Body() room: CreateRoomDto): Promise<Room> {
        return this.roomsService.createRoom(room);
    }
}
