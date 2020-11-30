import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "src/db/entities/company.entity";
import { Repository } from "typeorm";

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>
    ) {}

    async createCompany(company, userId): Promise<any> {
        let newCompany = await this.companyRepository.save(company)          

        await this.companyRepository.createQueryBuilder('companies')
            .relation('user')
            .of(newCompany.id)
            .set(userId)

        return await this.companyRepository.createQueryBuilder('companies')
            .where(`companies.id = ${newCompany.id}`)
            .getOne()
    }

    async deleteCompany(id): Promise<any> {
        return await this.companyRepository.delete(id)
    }

    async findByUserId(id, orderBy, ordering, query): Promise<any> {
        return await this.companyRepository.createQueryBuilder('companies')
            .orderBy(`companies.${orderBy}`, ordering)
            .where(`companies.userId = ${id}`)
            .skip(query.skip)
            .take(query.take)
            .getMany()
    }

    async updateInfo(id, company): Promise<any> {
        await this.companyRepository.update(id, company)
        return await this.companyRepository.createQueryBuilder('companies')
            .where(`companies.id = ${id}`)
            .getOne()
    }

    async findByName(name): Promise<any> {
        return await this.companyRepository.createQueryBuilder('companies')
            .select('companies.id')
            .where('companies.name = :name', { name: name })
            .getOne()
    }

    async findPublic(orderBy, ordering, query): Promise<any> {
        return await this.companyRepository.createQueryBuilder('companies')
            .orderBy(`companies.${orderBy}`, ordering)
            .where(`companies.private = false`)
            .leftJoinAndSelect('companies.user', 'user')
            .skip(query.skip)
            .take(query.take)
            .getMany()
    }

    async findAllCompanies(orderBy, ordering, query): Promise<any> {
        return await this.companyRepository.createQueryBuilder('companies')
        .orderBy(`companies.${orderBy}`, ordering)
        .leftJoinAndSelect('companies.user', 'user')
        .skip(query.skip)
        .take(query.take)
        .getMany()
    }
}
