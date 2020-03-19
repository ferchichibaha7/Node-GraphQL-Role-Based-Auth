import { sendRefreshToken } from './Auth/sendRefreshToken';
import { User } from './entity/User';
import { Role } from './entity/Role';
import "dotenv/config"
import { createConnection } from 'typeorm';
import { UserResolver } from './Resolvers/UserResolver';
import "reflect-metadata";
import express from "express"
import {ApolloServer} from "apollo-server-express"
import { buildSchema } from "type-graphql";
import { RoleEnum } from './entity/RoleEnum';
import  cookieParser from 'cookie-parser'
import { verify } from 'jsonwebtoken';
import { CreateAccessToken, CreateRefreshToken } from './Auth/Auth';
import cors from 'cors'


(async()=>{
    const app=express();
    const corsOptions = {
        origin: "http://localhost:3000",
        credentials: true
      };
    app.use(cors(corsOptions))
app.use(cookieParser())

    app.get('/',async(_req,res)=>  res.send("hello"))
app.post('/refresh_token',async(req,res)=>{
const token=req.cookies.BID
if(!token){
    res.send({ok:false,accessToken:''})
}
let payload=null
try {
     payload=verify(token,process.env.REFRESH_TOKEN_SECRET!)
} catch (error) {
    console.log(error)
    res.send({ok:false,accessToken:''})
}

const user=await User.findOne({id:payload.UserId})
if(!user){
    res.send({ok:false,accessToken:''})
}

if(user.tokenVersion!==payload.TokenVersion){
    return res.send({ok:false,accessToken:''})
}

sendRefreshToken(res,CreateRefreshToken(user))

res.send({ok:true,accessToken:CreateAccessToken(user)})

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
    resolvers:[UserResolver],
}),
context: ({req,res})=>({req,res})
})

   apolloserver.applyMiddleware({app})

    app.listen(4000,()=>{
    console.log('express server started!!')
})

})()



