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

    async findByEmail(email: string): Promise<User> {
        const options: FindOneOptions<User> = {
            where: { email: email }
        };
        return this.usersRepository.findOne(options);
    }

    async create(
        hospitalId: number,
        firstName: string,
        lastName: string,
        email: string,
        canApproveRequests: boolean,
        phoneNumber: string,
        createdBy: number
    ): Promise<User> {
        const newUser = new User();
        newUser.hospital_id = hospitalId;
        newUser.first_name = firstName;
        newUser.last_name = lastName;
        newUser.email = email;
        newUser.can_approve_requests = canApproveRequests;
        newUser.phone_number = phoneNumber;
        newUser.created_by = createdBy;
        return this.usersRepository.save(newUser);
    }

    async delete(id: number): Promise<string> {
        await this.usersRepository.delete(id);
        return `User ${id} has been deleted`;
    }
}
