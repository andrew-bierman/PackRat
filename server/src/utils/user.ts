import validator from 'validator';
import bcrypt from 'bcryptjs';

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
