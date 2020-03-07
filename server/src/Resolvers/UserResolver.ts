import { sendRefreshToken } from "./../Auth/sendRefreshToken";

import { Role } from "./../entity/Role";
import { CreateAccessToken } from "./../Auth/Auth";
import { CheckRole } from "./../Middlewares/checkRole";

import {
  Resolver,
  Query,
  Arg,
  Mutation,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int
} from "type-graphql";
import { hash, compare } from "bcryptjs";

import { MyContext } from "./../MyContext";
import { isAuth } from "./../Middlewares/isAuth";
import { RoleEnum } from "./../entity/RoleEnum";
import { User } from "./../entity/User";
import { CreateRefreshToken } from "./../Auth/Auth";
import { Profile } from "./../entity/Profile";
import { getConnection } from "typeorm";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {

 // --------------------------------------------------------------- Hello Admin
 @Query(() => String)
 hello() {
   return 'hello from server';
 }


  // --------------------------------------------------------------- Hello Admin
  @Query(() => String)
  @UseMiddleware(isAuth)
  @UseMiddleware(CheckRole([RoleEnum.ROLE_ADMIN]))
  helloAdmin(@Ctx() { payload }: MyContext) {
    return `hello Admin with ID:${payload?.UserId!} `;
  }

  // --------------------------------------------------------------- GetAll users
  @Query(() => [User])
  @UseMiddleware(isAuth)
  @UseMiddleware(CheckRole([RoleEnum.ROLE_USER, RoleEnum.ROLE_MOD]))
  async users() {
    return await User.find();
  }

  // --------------------------------------------------------------- Close sessions
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(CheckRole([RoleEnum.ROLE_ADMIN]))
  async revokeRefreshTokenForUser(@Arg("UserId", () => Int) UserId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: UserId }, "tokenVersion", 1);
      return true
  }

  // --------------------------------------------------------------- login
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("we can't find the user");
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("bad password");
    }
    sendRefreshToken(res, CreateRefreshToken(user));

    // Login successful
    return {
      accessToken: await CreateAccessToken(user)
    };
  }

  // --------------------------------------------------------------- register
  @Mutation(() => Boolean)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedpass = await hash(password, 12);
    try {
      const u = await User.findOne({ email });
      if (u) throw new Error("This email is already registred");
    } catch (error) {
      throw new Error("This email is already registred");
    }

    try {
      const user = await User.create({
        email,
        password: hashedpass
      });
      const userrole: any = await Role.findOne({ name: RoleEnum.ROLE_USER });
      const profile = await Profile.create({
        firstName: firstName,
        lastName: lastName
      });
      user.profile = profile;
      user.roles = [userrole];
      await User.save(user);
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
