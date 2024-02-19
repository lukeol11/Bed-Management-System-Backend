import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) {}

    async findAll(hospitalId?: number): Promise<UserDto[]> {
        if (hospitalId) {
            // Assuming there's a hospitalId field in the Users entity
            return this.usersRepository.find({
                where: { hospital_id: hospitalId }
            });
        } else {
            return this.usersRepository.find();
        }
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
