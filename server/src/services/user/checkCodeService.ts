import { User } from '../../drizzle/methods/User';

export async function checkCodeService(email: string, code: string) {
  const userClass = new User();
  const user = await userClass.findUser({ email, code });
  return user;
}
