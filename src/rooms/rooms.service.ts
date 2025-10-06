import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './entities/room.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>
    ) {}

    async createRoom(room: CreateRoomDto): Promise<Room> {
        return this.roomRepository.save(room);
    }

    async getAllRooms(params?: FindManyOptions<Room>): Promise<Room[]> {
        return this.roomRepository.find(params);
    }

    async deleteById(roomId: number): Promise<Room> {
        const rooms = await this.getAllRooms({
            where: { id: roomId }
        });
        return this.roomRepository.remove(rooms[0]);
    }
}
