import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../../utils/accountEmail';
import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { User } from '../../drizzle/methods/User';
import { hashPassword } from '../../utils/user';
import { Context, Next } from 'hono';
import { Env } from '../../env';
import { responseHandler } from '../../helpers/responseHandler';

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

export const userSignup = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { email, password, name, username } = body as {
      email: string;
      password: string;
      name: string;
      username: string;
    };
    const userClass = new User();

    // Check if user already exists
    const userExists = await userClass.findUser({ email });
    if (userExists) {
      console.log('userExists', userExists)
      const error = { error: 'Email already registered', statusCode: 400 }
      c.set('error', error)
      // return c.res.json({ error: 'Email already registered' }, 400);
      return await responseHandler(c);
    }

    // Environment variables
    const { env }: any = c;
    const { STMP_EMAIL, SEND_GRID_API_KEY, JWT_SECRET } = env;

    // Hash the password
    const hashedPassword = await hashPassword(JWT_SECRET, password);

    // Create new user
    const newUser = await userClass.create({
      email,
      username,
      password: hashedPassword,
      name,
    });

    // Generate auth token
    await userClass.generateAuthToken(JWT_SECRET, newUser.id);

    // Send welcome email
    await sendWelcomeEmail(
      newUser.email,
      newUser.name,
      STMP_EMAIL,
      SEND_GRID_API_KEY,
    );

    // Send response with new user
    c.set('data', newUser);
    return await responseHandler(c);
  } catch (err) {
    const error = { error: `Internal Server Error ${err}`, statusCode: '500' }
    c.set('error', error)
    return await responseHandler(c)
  }
};

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
