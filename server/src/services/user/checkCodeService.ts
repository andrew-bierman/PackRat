import { and, eq } from "drizzle-orm";
import { User } from "../../drizzle/methods/User";
import { user as UserTable } from "../../db/schema";
export async function checkCodeService({ prisma, email, code }: any) {
  const user = await new User().findByEmail(email.toLowerCase(), and(eq(UserTable.email, email.toLowerCase()), eq(UserTable.code, code)));
  return user;
}