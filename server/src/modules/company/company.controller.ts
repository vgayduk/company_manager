import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('company')
export class CompanyController {
    constructor(
        private companyService: CompanyService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/all') 
    async findAllCompanies(): Promise<any> {
        return await this.companyService.findAllCompanies()
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id/:orderBy/:ordering')
    async findById(@Param() params, @Query() query): Promise<any> {
        return await this.companyService.findById(params.id, params.orderBy, params.ordering, query)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:orderBy/:ordering')
    async findPublic(@Param() params, @Query() query): Promise<any> {
        return await this.companyService.findPublic(params.orderBy, params.ordering, query)
    }

    @Get('/findByName/:name')
    async findByEmail(@Param() params): Promise<any> {
        return await this.companyService.findByName(params.name)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/:userId')
    async createCompany(@Param() params, @Body() body): Promise<any> {
        return await this.companyService.createCompany(body.company, params.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    async updateInfo(@Param() params, @Body() body): Promise<any> {
        return await this.companyService.updateInfo(params.id, body.company)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param() params): Promise<any> {
        return await this.companyService.deleteCompany(params.id)
    }
}