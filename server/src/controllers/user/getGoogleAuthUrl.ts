import { type Context } from 'hono';
import { publicProcedure } from '../../trpc';

export const getGoogleAuthURL = async (c: Context) => {
  try {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    const scope = scopes.join(' ');
    const clientId = c.env.GOOGLE_CLIENT_ID;
    const clientSecret = c.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${c.env.SERVER_ROOT_URI}/user/${c.env.REDIRECT_URL}`;

    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&client_secret=${clientSecret}`;

    return c.json({ googleUrl, status: 'success' }, 200);
  } catch (error) {
    return c.json(
      { error: `Failed to get Google Auth URL: ${error.message}` },
      500,
    );
  }
};

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
