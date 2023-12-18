import { sendWelcomeEmail, resetEmail } from '../../utils/accountEmail';
import { User } from '../../prisma/methods';
import { google } from 'googleapis';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URI,
  REDIRECT_URL,
  UI_ROOT_URI,
  JWT_SECRET,
} from '../../config';
import utilsService from '../../utils/utils.service';
import { UserAlreadyExistsError } from '../../helpers/errors';

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${SERVER_ROOT_URI}/user/${REDIRECT_URL}`,
);

const getGoogleUserInfo = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  const { data: googleUser } = await google.oauth2('v2').userinfo.get({
    auth: oauth2Client,
  });
  return googleUser;
};

/**
 * Authenticates a user using Google Sign-In.
 * @param {object} req - The request object containing the query code.
 * @param {object} res - The response object.
 * @return {Promise} A promise that resolves to the generated token or an error message.
 */
export const googleSignin = async (req, res, next) => {
  try {
    const code = req.query.code;
    const userInfo = await getGoogleUserInfo(code);

    const alreadyGoogleSignin = await prisma.user.findFirst({
      where: {
        email: userInfo.email,
        name: userInfo.name,
        password: utilsService.randomPasswordGenerator(8),
        googleId: userInfo.id,
      },
    });

    if (!alreadyGoogleSignin) {
      const isLocalLogin = await prisma.user.findFirst({
        where: {
          email: userInfo.email,
        },
      });

      if (isLocalLogin) {
        next(UserAlreadyExistsError);
      }
      const generatedPassword = utilsService.randomPasswordGenerator(8);

      const user = await prisma.user.create({
        data: {
          email: userInfo.email,
          name: userInfo.name,
          password: generatedPassword,
          googleId: userInfo.id,
        },
      });

      const userWithMethods = User(user);
      await userWithMethods.generateAuthToken();

      sendWelcomeEmail(user.email, user.name);
      res.redirect(`${UI_ROOT_URI}?token=${user.token}`);
    } else {
      alreadyGoogleSignin.googleId = userInfo.id;
      const userWithMethods = User(alreadyGoogleSignin);
      await userWithMethods.generateAuthToken();
      res.redirect(`${UI_ROOT_URI}?token=${alreadyGoogleSignin.token}`);
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
