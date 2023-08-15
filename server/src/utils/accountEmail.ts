import { SEND_GRID_API_KEY, STMP_EMAIL } from "../config.ts";

import sgMail from "@sendgrid/mail";

if(!SEND_GRID_API_KEY){
  throw new Error("SEND_GRID_API_KEY is not set");
}
sgMail.setApiKey(SEND_GRID_API_KEY);

export const sendWelcomeEmail = (email: string, name: string) => {
  sgMail.send({
    to: email,
    from: {
      email: STMP_EMAIL??"",
      name: "PackRat Support",
    },
    subject: "Thanks for joining in PackRat!!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  }) .then((res: any) => {
    console.log("Email Sent");
    return res;
  })
  .catch((err: any) => {
    console.log("Email did not  Send", err);
    return err;
  });
};

export const resetEmail = (email: string, resetUrl: string) => {
  sgMail.send({
    to: email,
    from: {
      email: STMP_EMAIL??"",
      name: "PackRat Support",
    },
    subject: "Password Reset",
    html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">
          <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">Password Reset</h2>
          <p style="margin-bottom: 16px;">Click the link below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 8px 16px; background-color: #0070f3; color: #fff; text-decoration: none; border-radius: 4px; margin-bottom: 16px;">Reset Password</a>
          <p>If you did not request to reset your password, please ignore this email.</p>
        </div>
      `,
  }) .then((res) => {
    console.log("Email Sent");
    return res;
  })
  .catch((err) => {
    console.log("Email did not  Send", err);
    return err;
  });
};
