// user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../enums/role.enum';
import { IsEmail, IsPhoneNumber } from 'class-validator';

const RolesTransformer = {
    to: (roles: Role[] | string): string => {
        if (Array.isArray(roles)) return roles.join(',');
        if (typeof roles === 'string') return roles;
        return 'user';
    },
    from: (roles: string | string[] | null | undefined): Role[] => {
        if (Array.isArray(roles)) return roles as Role[];
        if (typeof roles === 'string') return roles.split(',') as Role[];
        return [];
    }
};

@Entity('users')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ name: 'first_name' })
    firstName: string;

    @ApiProperty()
    @Column({ name: 'last_name' })
    lastName: string;

    @ApiProperty()
    @Column({ name: 'hospital_id' })
    hospitalId: number;

    @ApiProperty()
    @Column()
    @IsEmail()
    email: string;

    @ApiProperty()
    @Column({ name: 'phone_number' })
    @IsPhoneNumber('IE')
    phoneNumber: string;

    @ApiProperty()
    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @ApiProperty()
    @Column({ name: 'created_by' })
    createdBy: number;

    @ApiProperty({ enum: Role, isArray: true })
    @Column({
        type: 'varchar',
        transformer: RolesTransformer,
        default: Role.User
    })
    roles: Role[];
}
