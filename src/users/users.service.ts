import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) {}

    async findAll(): Promise<Users[]> {
        return this.usersRepository.find(); // This method retrieves all users
    }

    async findById(id: number): Promise<Users> {
        const options: FindOneOptions<Users> = {
            where: { id: id }
        };
        return this.usersRepository.findOne(options);
    }

    async findByEmail(email: string): Promise<Users> {
        const options: FindOneOptions<Users> = {
            where: { email: email }
        };
        return this.usersRepository.findOne(options);
    }
}
