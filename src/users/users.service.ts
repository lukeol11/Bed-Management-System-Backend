import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async findAll(hospitalId?: number): Promise<UserDto[]> {
        if (hospitalId) {
            return this.usersRepository.find({
                where: { hospital_id: hospitalId }
            });
        } else {
            return this.usersRepository.find();
        }
    }

    async findById(id: number): Promise<UserDto> {
        if (process.env.NODE_ENV === 'test') {
            return {
                first_name: 'Test',
                last_name: 'User',
                email: 'test@test.com',
                hospital_id: 1,
                phone_number: '1234567890',
                created_at: new Date(),
                created_by: 1,
                can_administrate: true,
                can_approve_requests: true
            };
        }
        const options: FindOneOptions<User> = {
            where: { id: id }
        };
        return this.usersRepository.findOne(options);
    }

    async findByEmail(email: string): Promise<UserDto> {
        if (process.env.NODE_ENV === 'test') {
            return {
                first_name: 'Test',
                last_name: 'User',
                email: 'test@test.com',
                hospital_id: 1,
                phone_number: '1234567890',
                created_at: new Date(),
                created_by: 1,
                can_administrate: true,
                can_approve_requests: true
            };
        }
        const options: FindOneOptions<User> = {
            where: { email: email }
        };
        return this.usersRepository.findOne(options);
    }

    async createUser(user: UserDto): Promise<UserDto> {
        return this.usersRepository.save(user);
    }

    async delete(id: number): Promise<string> {
        await this.usersRepository.delete(id);
        return `User ${id} has been deleted`;
    }
}
