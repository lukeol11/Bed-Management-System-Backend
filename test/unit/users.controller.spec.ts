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
                    id: 1,
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john@example.com',
                    hospital_id: 1,
                    can_approve_requests: true,
                    phone_number: '1234567890',
                    created_by: 1,
                    created_at: new Date()
                }
            ];
            jest.spyOn(usersService, 'findAll').mockResolvedValue(users);

            expect(await controller.getAllUsers()).toBe(users);
        });
    });

    describe('findUser', () => {
        it('should return a user by ID', async () => {
            const user: UserDto = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@example.com',
                hospital_id: 1,
                can_approve_requests: true,
                phone_number: '1234567890',
                created_by: 1,
                created_at: new Date()
            };
            jest.spyOn(usersService, 'findById').mockResolvedValue(user);

            expect(await controller.findUser(1)).toBe(user);
        });

        it('should return a user by email', async () => {
            const user: UserDto = {
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@example.com',
                hospital_id: 1,
                can_approve_requests: true,
                phone_number: '1234567890',
                created_by: 1,
                created_at: new Date()
            };
            jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);

            expect(
                await controller.findUser(undefined, 'john@example.com')
            ).toBe(user);
        });

        it('should throw an error if neither ID nor email provided', async () => {
            await expect(controller.findUser()).rejects.toThrowError(
                'You must provide either an ID or an email to find a user.'
            );
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const newUser: UserDto = {
                id: 2,
                first_name: 'Jane',
                last_name: 'Doe',
                email: 'jane@example.com',
                hospital_id: 1,
                can_approve_requests: false,
                phone_number: '9876543210',
                created_by: 1,
                created_at: new Date()
            };
            jest.spyOn(usersService, 'create').mockResolvedValue(newUser);

            expect(
                await controller.createUser(
                    'Jane',
                    'Doe',
                    'jane@example.com',
                    1,
                    false,
                    '9876543210',
                    1
                )
            ).toBe(newUser);
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
