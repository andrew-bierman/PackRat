import User from '../../models/userModel';
import { sendWelcomeEmail, resetEmail } from '../../utils/accountEmail';
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

interface GoogleUserInfo {
  id?: string | null;
  email?: string | null;
  name?: string | null;
}

interface AlreadySigninInfo {
  googleId?: string | null;
  email?: string | null;
  name?: string | null;
  password?: any;
  generateAuthToken?: any;
  token: any;
}

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
    const userInfo: GoogleUserInfo = await getGoogleUserInfo(code);

    const alreadyGoogleSignin: AlreadySigninInfo | null = await User.findOne({
      email: userInfo.email,
      name: userInfo.name,
      password: utilsService.randomPasswordGenerator(8),
      googleId: userInfo.id,
    });
    if (!alreadyGoogleSignin) {
      const isLocalLogin = await User.findOne({ email: userInfo.email });
      if (isLocalLogin) {
        next(UserAlreadyExistsError);
      }
      const user = new User({
        email: userInfo.email,
        name: userInfo.name,
        password: utilsService.randomPasswordGenerator(8),
        googleId: userInfo.id,
      });
      await user.save();
      await user.generateAuthToken();
      sendWelcomeEmail(user.email, user.name);
      res.redirect(`${UI_ROOT_URI}?token=${user.token}`);
    } else {
      alreadyGoogleSignin.googleId = userInfo.id;
      await alreadyGoogleSignin.generateAuthToken();
      res.redirect(`${UI_ROOT_URI}?token=${alreadyGoogleSignin.token}`);
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
