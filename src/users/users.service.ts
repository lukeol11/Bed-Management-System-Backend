import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

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
        const options: FindOneOptions<User> = {
            where: { id: id }
        };
        return this.usersRepository.findOne(options);
    }

    async findByEmail(email: string): Promise<UserDto> {
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

