import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { User } from './db/entities/users.entity';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Parser } from './parser';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [
    UserModule,
    CompanyModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "127.0.0.1",
      port: 5432,
      database: "dev-backend",
      username: "postgres",
      password: "12345",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Parser)
      .forRoutes('/auth/login');
  }
}