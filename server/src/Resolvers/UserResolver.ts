import { Role } from './../entity/Role';
import { CreateAccessToken } from './../Auth/Auth';
import { CheckRole } from './../Middlewares/checkRole';


import {
  Resolver,
  Query,
  Arg,
  Mutation,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware
} from "type-graphql";
import { hash, compare } from "bcryptjs";

import { MyContext } from "./../MyContext";
import { isAuth } from "./../Middlewares/isAuth";
import { RoleEnum } from "./../entity/RoleEnum";
import { User } from "./../entity/User";
import { CreateRefreshToken } from "./../Auth/Auth";





@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {




  // --------------------------------------------------------------- Hello Admin
  @Query(() => String)
  @UseMiddleware(isAuth)
  @UseMiddleware(CheckRole([RoleEnum.ROLE_ADMIN]))
  helloAdmin(@Ctx() {payload}:MyContext) {
 return `hello Admin with ID:${payload?.UserId!} `;
  }


  // --------------------------------------------------------------- GetAll users
  @Query(() => [User])
  @UseMiddleware(isAuth)
  @UseMiddleware(CheckRole([RoleEnum.ROLE_USER,RoleEnum.ROLE_MOD]))
  async users() {
    return await User.find();
  }


  // --------------------------------------------------------------- login
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() {res}:MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("we can't find the user");
    }
    const valid =await compare(password, user.password);
    if (!valid) {
      throw new Error("bad password");
    }
    res.cookie("BID",CreateRefreshToken(user),
{
httpOnly:true // can't be access bu javascript or something
})
    // Login successful
    return {
      accessToken: await CreateAccessToken(user)
    };
  }



  // --------------------------------------------------------------- register
  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
   
  ) {
    const hashedpass = await hash(password, 12);
    try {
      const user =await  User.create({
        email,
        password: hashedpass,
       
      });
      const userrole:any=await Role.findOne({name:RoleEnum.ROLE_USER})
      
      user.roles=[userrole]
      User.save(user);
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
