/**
 * Sends a welcome email to a user.
 *
 * @param {string} email - The email address of the recipient.
 * @param {string} name - The name of the recipient.
 * @param {string} smtpEmail - The email address of the sender.
 * @param {string} sendGridApiKey - The SendGrid API key.
 * @return {Promise<any>} A promise that resolves with the response from the email server, or rejects with an error.
 */
export const sendWelcomeEmail = async (
  email: string,
  name: string,
  smtpEmail: string,
  sendGridApiKey: string,
): Promise<any> => {
  try {
    console.log('sending email');
    const emailData = {
      personalizations: [
        {
          to: [{ email }],
          subject: 'Thanks for joining in PackRat!!',
        },
      ],
      from: { email: smtpEmail, name: 'PackRat Support' },
      content: [
        {
          type: 'text/plain',
          value: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
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
      console.log('Email did not Send');
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Email Sent');
    // const data = await response.json();
    // return data;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

/**
 * Sends a password reset email to the specified email address.
 *
 * @param {string} email - The email address to send the reset email to.
 * @param {string} resetUrl - The URL to include in the reset email.
 * @param {string} smtpEmail - The email address of the sender.
 * @param {string} sendGridApiKey - The SendGrid API key.
 * @return {Promise<any>} A promise that resolves when the email is sent successfully, or rejects with an error if the email fails to send.
 */
export const resetEmail = async (
  email: string,
  resetUrl: string,
  smtpEmail: string,
  sendGridApiKey: string,
): Promise<any> => {
  try {
    const emailData = {
      personalizations: [
        {
          to: [{ email }],
          subject: 'Password Reset',
        },
      ],
      from: { email: smtpEmail, name: 'PackRat Support' },
      content: [
        {
          type: 'text/html',
          value: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">
          <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">Password Reset</h2>
          <p style="margin-bottom: 16px;">Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 8px 16px; background-color: #0070f3; color: #fff; text-decoration: none; border-radius: 4px; margin-bottom: 16px;">Reset Password</a>
          <p>If you did not request to reset your password, please ignore this email.</p>
        </div>
      `,
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

    // if (!response.ok) {
    //   console.log('Email did not Send');
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    console.log('Email Sent', response);
    // return await response.json();
  } catch (error) {
    console.error('Error resetting email:', error);
  }
};
