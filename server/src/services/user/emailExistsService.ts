import { PrismaClient } from '@prisma/client/edge';
import {
  findUserAndUpdate,
  findUserByEmail,
} from '../../services/user/user.service';

export async function emailExistsService({
  prisma,
  email,
  sendGridApiKey,
}: {
  sendGridApiKey: string;
  prisma: PrismaClient;
  email?: string;
}) {
  const val = await findUserByEmail(prisma, email);
  if (val) {
    sendEmailNotice(sendGridApiKey, email).then(async (result1: any) => {
      if (result1.status) {
        const { newcode } = result1;
        findUserAndUpdate(prisma, email, newcode, 'code').then(
          async (result2: any) => {
            if (result2.status) {
              return result2;
            }
          },
        );
      }
    });
  } else {
    return val;
  }
}

/**
 * Sends an email notice to the specified email address.
 * @param {string} email - The email address to send the notice to.
 * @return {Promise} - A promise that resolves to an object indicating the status of the email sending process.
 */
async function sendEmailNotice(sendGridApiKey, email) {
  const newcode = Math.floor(Math.random() * 999999 + 111111);

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sendGridApiKey}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: email }],
          subject: 'PackRat verification code',
        },
      ],
      from: { email: 'Hailemelekot@gmail.com' },
      content: [
        {
          type: 'text/plain',
          value: 'Your verification code is ' + newcode,
        },
      ],
    }),
  });

  if (!response.ok) {
    return { status: false };
  }

  return { status: true, newcode };
}
