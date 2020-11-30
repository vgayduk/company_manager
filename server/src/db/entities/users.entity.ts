import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    nickname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column()
    description: string;

    @Column()
    position: string;

    @Column({ default: 'user' })
    role: string;

    @OneToMany(() => Company, company => company.user)
    company: Company[];

    @CreateDateColumn({ type: 'timestamp', default: new Date() })
    createdAt: Date;
    
    @CreateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date;
}
