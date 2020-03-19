import { Response } from 'express';


export const sendRefreshToken=(res:Response,token:string)=>{
    res.cookie("BID",token,
    {
    httpOnly:true // can't be access bu javascript or something
    })

}