import { createConnection } from 'typeorm';
import { UserResolver } from './UserResolver';
import "reflect-metadata";
import express from "express"
import {ApolloServer} from "apollo-server-express"
import { buildSchema } from "type-graphql";




(async()=>{
    const app=express();
    app.get('/',(_req,res)=>{
        res.send("hello")
    })

    await createConnection()

const apolloserver =new ApolloServer({
schema:await buildSchema({
    resolvers:[UserResolver]
})
})

   apolloserver.applyMiddleware({app})


    app.listen(4000,()=>{
    console.log('express server started!!')
})

})()



