
import { User } from './entity/User';
import { MyContext } from './MyContext';
import { MiddlewareFn } from "type-graphql"


export function CheckRole(role: string): MiddlewareFn<MyContext> {
  return async ({context}, next) => {
   let userroles:string[]=[]
if(context.payload){
    const id = context.payload?.UserId
 

      const  user = await User.findOne( { where: { id:id } })
      user?.roles.map(rolename=>userroles.push(rolename.name))
      if (!(userroles.indexOf(role)>-1))
     throw new Error(role+' role is required');

return next()
}}}

