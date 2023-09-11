import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import {
  findUserAndUpdate,
  findUserByEmail,
} from '../../services/user/user.service';
import { UnableToSendCodeError } from '../../helpers/errors';
import { responseHandler } from '../../helpers/responseHandler';
import { publicProcedure } from '../../trpc';
import * as validator from '../../../../packages/src/validations';
/**
 * Check if the provided email exists in the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {Promise<void>} - A promise that resolves to nothing.
 */
export const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const val = await findUserByEmail(email);
  if (val) {
    sendEmailNotice(email).then(async (result1: any) => {
      if (result1.status) {
        const { newcode } = result1;
        findUserAndUpdate(email, newcode, 'code').then(async (result2: any) => {
          if (result2.status) {
            responseHandler(res);
          } else {
            next(result2);
          }
        });
      } else {
        next(UnableToSendCodeError);
      }
    });
  } else {
    res.locals.data = val;
    responseHandler(res);
  }
};

/**
 * Sends an email notice to the specified email address.
 * @param {string} email - The email address to send the notice to.
 * @return {Promise} - A promise that resolves to an object indicating the status of the email sending process.
 */
async function sendEmailNotice(email) {
  return await new Promise((resolve, reject) => {
    const newcode = Math.floor(Math.random() * 999999 + 111111);
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.APPPASSWORD,
        },
      }),
    );

    const mailOptions = {
      from: 'Hailemelekot@gmail.com',
      to: email,
      subject: 'PackRat verification code',
      text: 'Your verification code is ' + newcode,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        resolve({ status: false });
      } else {
        resolve({ status: true, newcode });
      }
    });
  });
}

export function emailExistsRoute() {
  return publicProcedure
    .input(validator.emailExists)
    .mutation(async (opts) => {
      const { email } = opts.input;
      const val = await findUserByEmail(email);
      if (val) {
        sendEmailNotice(email).then(async (result1: any) => {
          if (result1.status) {
            const { newcode } = result1;
            findUserAndUpdate(email, newcode, 'code').then(async (result2: any) => {
              if (result2.status) {
                return result2
              }
            });
          }
        });
      } else {
        return val
      }
    });
}