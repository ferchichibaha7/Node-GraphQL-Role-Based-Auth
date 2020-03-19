
import { User } from './../entity/User';
import { MyContext } from './../MyContext';
import { MiddlewareFn } from "type-graphql"


export function CheckRole(role:Array<string>): MiddlewareFn<MyContext> {
  return async ({context}, next) => {
   let userroles:string[]=[]
if(context.payload){
    const id = context.payload?.UserId
 

      const  user = await User.findOne( { where: { id:id } })
      user?.roles.map(rolename=>userroles.push(rolename.name))
      let exist:boolean=false
      role.forEach(r => {
        if ((userroles.indexOf(r)>-1)){
        exist=true;
         
        }
      });
      if(!exist) throw new Error("You are not authorized!")
      return next()

}}}

