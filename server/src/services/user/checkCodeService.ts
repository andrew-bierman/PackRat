import { User } from '../../prisma/methods';

export async function checkCodeService({ prisma, email, code }: any) {
  const user = await prisma.user.findFirst({
    where: {
      email: email.toLowerCase(),
      code,
    },
  });

  return User(user)?.toJSON(); // Assuming you want to return the user if found
}
