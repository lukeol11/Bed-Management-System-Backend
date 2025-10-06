import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async find(params?: FindManyOptions<User>): Promise<User[]> {
        return this.usersRepository.find(params);
    }

    async createUser(user: CreateUserDto): Promise<User> {
        return this.usersRepository.save(user);
    }

    async delete(id: number) {
        const users = await this.find({
            where: { id }
        });
        return this.usersRepository.remove(users[0]);
    }
}
