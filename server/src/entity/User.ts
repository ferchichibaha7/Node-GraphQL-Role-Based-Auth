import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, OneToOne, JoinColumn} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Role } from "./Role";
import { Profile } from "./Profile";


@ObjectType()
@Entity("user")
export class User extends BaseEntity {
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    email: string;

 
    @Column()
    password: string;

    @OneToOne(()=> Profile,{ eager: true ,cascade:true})
    @JoinColumn()
    @Field(()=>Profile,{nullable:true})
    profile: Profile;


    @ManyToMany(()=> Role, Role => Role.users, { eager: true ,cascade:true})
    @JoinTable()
    @Field(()=>[Role])
    roles:Role[];
  
   
    @Column("int",{default:0})
    tokenVersion: number;

}
