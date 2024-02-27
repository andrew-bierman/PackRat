import validator from 'validator';
import bcrypt from 'bcryptjs';
import * as jwt from 'hono/jwt';

export const validateEmail = (email: string) => {
  if (!validator.isEmail(email)) {
    throw new Error('Email is invalid');
  }
  return email.trim().toLowerCase();
};

export const validatePassword = (password: string) => {
  if (password.search(/password/i) !== -1) {
    throw new Error("The password cannot contain the word 'password'");
  }

  if (password.length < 7) {
    throw new Error('The password must contain at least 7 characters');
  }
  return password.trim();
};

export const validateUsername = (username: string) => {
  if (!validator.isAlphanumeric(username)) {
    throw new Error('Username is invalid');
  }
  return username.trim().toLowerCase();
};

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
