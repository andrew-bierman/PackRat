import bcrypt from 'bcryptjs';
import * as jwt from 'hono/jwt';

export const hashPassword = async (jwtSecret: string, password: string) => {
  const salt = await bcrypt.genSalt(parseInt(jwtSecret));
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Verify a password reset token and return the user's email address
export const verifyPasswordResetToken = async (
  token: string,
  secret: string,
) => {
  try {
    const decoded: any = await jwt.verify(token, secret);
    return decoded.email;
  } catch (error) {
    console.error('Error verifying password reset token:', error);
    return null;
  }
};
