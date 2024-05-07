import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../../utils/accountEmail';
import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';
import { hashPassword } from '../../utils/user';
// export const userSignup = async (req: Request, res: Response) => {
//   const { email } = req.body;
//   console.log(`the request body received is ${JSON.stringify(req.body)}`);
//   await userClass.alreadyLogin(email);
//   const salt = await bcrypt.genSalt(parseInt(JWT_SECRET));
//   req.body.password = await bcrypt.hash(req.body.password, salt);

//   const newUser = await userClass.create({
//     data: req.body,
//   });
//   const userWithMethods = User(newUser);
//   await userWithMethods.generateAuthToken();
//   sendWelcomeEmail(newUser.email, newUser.name);
//   res.status(201).send({ user: newUser });
// };

export function signUpRoute() {
  return publicProcedure.input(validator.userSignUp).mutation(async (opts) => {
    let { email, password, name, username } = opts.input;
    const { env }: any = opts.ctx;
    const userClass = new User();
    const userExists = await userClass.findUser({ email });
    if (userExists) {
      throw new Error('Email already registered');
    }
    const STMP_EMAIL = env.STMP_EMAIL;
    const SEND_GRID_API_KEY = env.SEND_GRID_API_KEY;
    const JWT_SECRET = env.JWT_SECRET;
    password = await hashPassword(JWT_SECRET, password);
    const user = await userClass.create({
      email,
      username,
      password,
      name,
    });
    await userClass.generateAuthToken(JWT_SECRET, user.id);
    await sendWelcomeEmail(
      user.email,
      user.name,
      STMP_EMAIL,
      SEND_GRID_API_KEY,
    );
    return user;
  });
}
