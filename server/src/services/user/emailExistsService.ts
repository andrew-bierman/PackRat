import {
  findUserAndUpdate,
  findUserByEmail,
} from '../../services/user/user.service';

export async function emailExistsService({
  email,
  smtpEmail,
  sendGridApiKey,
}: {
  email: string;
  sendGridApiKey: string;
  smtpEmail: string;
}) {
  try {
    const val = await findUserByEmail(email);
    if (!val) {
      throw new Error(val);
    }
    const result1 = await sendEmailNotice({ sendGridApiKey, smtpEmail, email });
    console.log('result1result1', result1);
    if (result1.status) {
      const { newcode } = result1;
      const result2 = await findUserAndUpdate(email, newcode, 'code');
      if (result2.status) {
        return result2;
      }
    }
  } catch (error) {
    console.log('error', error.message);
    throw new Error(error.message);
  }
}

/**
 * Sends an email notice to the specified email address.
 * @param {string} email - The email address to send the notice to.
 * @return {Promise} - A promise that resolves to an object indicating the status of the email sending process.
 */
export async function sendEmailNotice({
  email,
  smtpEmail,
  sendGridApiKey,
}: {
  email: string;
  sendGridApiKey: string;
  smtpEmail: string;
}): Promise<any> {
  try {
    const newcode = Math.floor(Math.random() * 999999 + 111111);
    const emailData = {
      personalizations: [
        {
          to: [{ email }],
          subject: 'PackRat verification code',
        },
      ],
      from: {
        // email: 'Hailemelekot@gmail.com'
        email: smtpEmail,
      },
      content: [
        {
          type: 'text/plain',
          value: 'Your verification code is ' + newcode,
        },
      ],
    };
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sendGridApiKey}`,
      },
      body: JSON.stringify(emailData),
    });
    if (!response.ok) {
      return { status: false };
    }
    return { status: true, newcode };
  } catch (error) {
    console.error('Error sending email notice:', error);
  }
}
