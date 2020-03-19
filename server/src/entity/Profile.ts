import {Entity, PrimaryGeneratedColumn, Column, BaseEntity,  CreateDateColumn, UpdateDateColumn} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity("profile")
export class Profile extends BaseEntity {
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName?: string;

    @Field()
    @Column()
    lastName?: string;

    @Field()
    @CreateDateColumn({ type: "timestamp" })
    createdAt: number;
    
    @Field()
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: number;
  
}
