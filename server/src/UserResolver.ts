import { User } from "./entity/User";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  ObjectType,
  Field
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
 return "hi!";
  }

  @Query(() => [User])
  async users() {
    return await User.find();
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("we can't find the user");
    }
    const valid =await compare(password, user.password);
    if (!valid) {
      throw new Error("bad password");
    }

    // Login successful
    return {
      accessToken: await sign({ UserId: user.id , UserEmail:user.email},"dfsdfsd5sdfs4sdfsdf",{
          expiresIn:"15m"
      })
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedpass = await hash(password, 12);
    try {
      await User.insert({
        email,
        password: hashedpass
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
