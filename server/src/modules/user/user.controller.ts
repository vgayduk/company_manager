import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('/check')
    async isAuthorized(): Promise<any> {
        return await {
            isAuthorized: true
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/all') 
    async findAllUsers(): Promise<any> {
        return await this.userService.findAllUsers()
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/profile/:id')
    async findOneUser(@Param() params): Promise<any> {
        return await this.userService.findOneUser(params.id)
    }

    // @UseGuards(JwtAuthGuard)
    @Get('/findByEmail/:email')
    async findByEmail(@Param() params): Promise<any> {
        return await this.userService.findByEmail(params.email)
    }

    @Post()
    async createUser(@Body() body): Promise<any> {
        return await this.userService.createUser(body.user)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    async updateInfo(@Param() params, @Body() body): Promise<any> {
        return await this.userService.updateInfo(params.id, body.user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param() params): Promise<any> {
        return await this.userService.deleteUser(params.id)
    }
}