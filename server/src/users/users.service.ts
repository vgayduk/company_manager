import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "src/db/entities/users.entity";
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findOne(email: string): Promise<any | undefined> {        
        return await this.userRepository.createQueryBuilder('users')
            .where('users.email = :email', { email: email })
            .leftJoinAndSelect('users.company', 'company')
            .getOne()
    }
}