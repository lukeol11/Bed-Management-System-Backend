import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/CreateRoom.dto';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private roomRepository: Repository<Room>
    ) {}

    async createRoom(room: CreateRoomDto): Promise<Room> {
        return this.roomRepository.save(room);
    }

    async getAllRooms(): Promise<Room[]> {
        return this.roomRepository.find();
    }

    async getRoomById(room_id: number): Promise<Room> {
        return this.roomRepository.findOne({
            where: { id: room_id }
        });
    }

    async getRoomsByWardId(ward_id: number): Promise<Room[]> {
        return this.roomRepository.find({
            where: { ward_id: ward_id }
        });
    }

    async deleteRoomById(room_id: number): Promise<string> {
        const room = await this.getRoomById(room_id);
        await this.roomRepository.delete(room);
        return 'Room deleted successfully';
    }
}
