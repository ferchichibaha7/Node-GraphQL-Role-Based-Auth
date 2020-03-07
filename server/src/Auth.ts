import { sign } from 'jsonwebtoken';
import { User } from './entity/User';

export const CreateAccessToken = (user:User)=>{
return sign({ UserId: user.id,Authorization:user.roles},process.env.ACCESS_TOKEN_SECRET!,{
    expiresIn:"15m"
})
}

export const CreateRefreshToken = (user:User)=>{
    return sign({ UserId: user.id,Authorization:user.roles},process.env.REFRESH_TOKEN_SECRET!,{
        expiresIn:"7d"
      })
}