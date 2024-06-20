import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/users/users.controller';
import { UsersService } from '../../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/users/entities/user.entity';
import { UserDto } from '../../src/users/dto/user.dto';

describe('UsersController', () => {
    let controller: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {}
                }
            ]
        }).compile();

        controller = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllUsers', () => {
        it('should return an array of users', async () => {
            const users: UserDto[] = [
                {
                    first_name: 'John',
                    last_name: 'Doe',
                    can_approve_requests: true,
                    can_administrate: false,
                    hospital_id: 1,
                    email: 'john.doe2@example.com',
                    phone_number: '123-456-7890',
                    created_at: new Date('2024-02-19T15:21:29.000Z'),
                    created_by: 1
                },
                {
                    first_name: 'Jane',
                    last_name: 'Doe',
                    can_approve_requests: false,
                    can_administrate: false,
                    hospital_id: 2,
                    email: 'jane.doe@example.com',
                    phone_number: '123-456-7890',
                    created_at: new Date('2024-02-19T15:21:29.000Z'),
                    created_by: 2
                }
            ];
            jest.spyOn(usersService, 'findAll').mockResolvedValue(users);

            expect(await controller.getAllUsers()).toBe(users);
        });
    });

    describe('findUser', () => {
        it('should return a user by ID', async () => {
            const user: UserDto = {
                first_name: 'John',
                last_name: 'Doe',
                can_approve_requests: true,
                can_administrate: false,
                hospital_id: 1,
                email: 'john.doe2@example.com',
                phone_number: '123-456-7890',
                created_at: new Date('2024-02-19T15:21:29.000Z'),
                created_by: 1
            };
            jest.spyOn(usersService, 'findById').mockResolvedValue(user);

            expect(await controller.findUser(1)).toBe(user);
        });

        it('should return a user by email', async () => {
            const user: UserDto = {
                first_name: 'John',
                last_name: 'Doe',
                can_approve_requests: true,
                can_administrate: false,
                hospital_id: 1,
                email: 'john.doe2@example.com',
                phone_number: '123-456-7890',
                created_at: new Date('2024-02-19T15:21:29.000Z'),
                created_by: 1
            };
            jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);

            expect(
                await controller.findUser(undefined, 'john@example.com')
            ).toBe(user);
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const newUser: UserDto = {
                first_name: 'John',
                last_name: 'Doe',
                can_approve_requests: true,
                can_administrate: false,
                hospital_id: 1,
                email: 'john.doe2@example.com',
                phone_number: '123-456-7890',
                created_at: new Date('2024-02-19T15:21:29.000Z'),
                created_by: 1
            };
            jest.spyOn(usersService, 'createUser').mockResolvedValue(newUser);

            expect(await controller.createUser(newUser)).toBe(newUser);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user by ID', async () => {
            jest.spyOn(usersService, 'delete').mockResolvedValue(
                'User deleted'
            );

            expect(await controller.deleteUser(1)).toBe('User deleted');
        });
    });
});
