import { isAuth } from './isAuth';
import {  CreateAccessToken, CreateRefreshToken } from './Auth';
import { MyContext } from './MyContext';
import { User } from "./entity/User";
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
import { CheckRole } from './checkRole';
import { Role } from './entity/Role';
import { RoleEnum } from './RoleEnum';


@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  @UseMiddleware(CheckRole(RoleEnum.ROLE_ADMIN))
  helloAdmin(@Ctx() {payload}:MyContext) {
 return `hello Admin with ID:${payload?.UserId!} `;
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  @UseMiddleware(CheckRole(RoleEnum.ROLE_USER))
  async users() {
    return await User.find();
  }



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
