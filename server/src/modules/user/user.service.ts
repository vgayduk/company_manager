import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/db/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findAllUsers(orderBy, ordering, query): Promise<any> {
        return await this.userRepository.createQueryBuilder('users')
        .orderBy(`users.${orderBy}`, ordering)
        .skip(query.skip)
        .take(query.take)
        .getMany()
    }

    async createUser(user): Promise<any> {
        await this.userRepository.save(user)
        return {
            id: user.id
        }
    }

    async deleteUser(id): Promise<any> {
        return await this.userRepository.delete(id)
    }

    async updateInfo(id, user): Promise<any> {
        await this.userRepository.update(id, user)
        const newUser = await this.userRepository.createQueryBuilder('users')
            .where(`users.id = ${id}`)
            .leftJoinAndSelect('users.company', 'company')
            .getOne()

        const {password, ...result} = newUser;

        return result;
    }

    async findOneUser(id): Promise<any> {
        return await this.userRepository.createQueryBuilder('users')
            .where(`users.id = ${id}`)
            .leftJoinAndSelect('users.company', 'company')
            .getOne()
    }

    async findByEmail(email): Promise<any> {
        return await this.userRepository.createQueryBuilder('users')
            .select('users.id')
            .where('users.email = :email', { email: email })
            .getOne()
    }
}