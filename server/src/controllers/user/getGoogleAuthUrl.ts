import { google } from "googleapis";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URI,
  REDIRECT_URL,
  UI_ROOT_URI,
  JWT_SECRET,
} from "../../config";

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${SERVER_ROOT_URI}/user/${REDIRECT_URL}`
);

/**
 * Retrieves the Google authentication URL.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The Google authentication URL and status.
 */
export const getGoogleAuthURL = async (req, res) => {
      const scopes = [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ];
      return res.status(200).send({
        googleUrl: oauth2Client.generateAuthUrl({
          access_type: "offline",
          prompt: "consent",
          scope: scopes,
        }),
        status: "success",
        statusCode: 200,
      });
    
  };
  