import { Role } from './entity/Role';
import { User } from './entity/User';
import "dotenv/config"
import { createConnection } from 'typeorm';
import { UserResolver } from './UserResolver';
import "reflect-metadata";
import express from "express"
import {ApolloServer} from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { RoleEnum } from './RoleEnum';




(async()=>{
    const app=express();
    app.get('/',async(_req,res)=>{
      const users=  await User.find()
        res.json(users)
    })
    await createConnection()

    for(let role in RoleEnum){
       let r= Role.create({name:RoleEnum[role]})
let rolename=await Role.findOne(r);
        if(!rolename)
        Role.insert({name:RoleEnum[role]})
    }
  



const apolloserver =new ApolloServer({
schema:await buildSchema({
    resolvers:[UserResolver]
}),
context: ({req,res})=>({req,res})
})

   apolloserver.applyMiddleware({app})
<<<<<<< HEAD
<<<<<<< HEAD


=======
 
>>>>>>> dev
=======
>>>>>>> 67fafdc3c90cdf6687ac43f73e87854a38f53f2e
    app.listen(4000,()=>{
    console.log('express server started!!')
})

})()



