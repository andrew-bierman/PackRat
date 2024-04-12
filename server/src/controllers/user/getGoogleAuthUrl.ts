import { google } from 'googleapis';
// import {
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   SERVER_ROOT_URI,
//   REDIRECT_URL,
//   UI_ROOT_URI,
//   JWT_SECRET,
// } from '../../config';
import { publicProcedure } from '../../trpc';

// const oauth2Client = new google.auth.OAuth2(
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   `${SERVER_ROOT_URI}/user/${REDIRECT_URL}`,
// );

/**
 * Retrieves the Google authentication URL.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The Google authentication URL and status.
 */
// export const getGoogleAuthURL = async (req, res) => {
//   const scopes = [
//     'https://www.googleapis.com/auth/userinfo.profile',
//     'https://www.googleapis.com/auth/userinfo.email',
//   ];
//   return res.status(200).send({
//     googleUrl: oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       prompt: 'consent',
//       scope: scopes,
//     }),
//     status: 'success',
//     statusCode: 200,
//   });
// };

export function getGoogleAuthURLRoute() {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  const scope = scopes.join(' ');
  return publicProcedure.query(async (opts) => {
    const { env }: any = opts.ctx;
    const clientId = env.GOOGLE_CLIENT_ID;
    const clientSecret = env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${env.SERVER_ROOT_URI}/user/${env.REDIRECT_URL}`;

    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&client_secret=${clientSecret}`;
    const response = await fetch(googleUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return {
      googleUrl: await response.json(),
      status: response.ok ? 'success' : 'failure',
      statusCode: response.status,
    };
  });
}
