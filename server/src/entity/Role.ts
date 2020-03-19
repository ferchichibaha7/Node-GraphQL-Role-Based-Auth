import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity("role")
export class Role extends BaseEntity {
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    
    @ManyToMany(() => User, user => user.roles)
    users: User[];

   

  
}