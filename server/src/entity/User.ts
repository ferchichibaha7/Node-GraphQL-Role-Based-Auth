import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Role } from "./Role";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    email: string;

 
    @Column()
    password: string;


    @ManyToMany(()=> Role, Role => Role.users, { eager: true ,cascade:true})
    @JoinTable()
    @Field(()=>[Role])
    roles:Role[];
  
}
