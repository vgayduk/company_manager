import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    name: string;

    @Column()
    address: string;

    @Column()
    serviceOfActivity: string;

    @Column()
    numberOfEmployees: number;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column({ default: true })
    private: boolean;

    @ManyToOne(() => User, user => user.company)
    @JoinColumn()
    user: User;

    @CreateDateColumn({ type: 'timestamp', default: new Date() })
    createdAt: Date;
    
    @CreateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date;
}
