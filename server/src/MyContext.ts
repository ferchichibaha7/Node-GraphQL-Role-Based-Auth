import {Request,Response} from "express"
import { Role } from "./entity/Role";

export interface MyContext {
req:Request,
res:Response,
payload?:{UserId:string}} 