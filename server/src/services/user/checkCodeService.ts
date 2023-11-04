import { prisma } from '../../prisma/index';

export async function checkCodeService({ email, code }: any) {
  const user = await prisma.user.findFirst({
    where: {
      email: email.toLowerCase(),
      code,
    },
  });

  return user; // Assuming you want to return the user if found
}
