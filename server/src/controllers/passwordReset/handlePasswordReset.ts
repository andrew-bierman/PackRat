import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import User from "../../models/userModel";
import {
  STMP_EMAIL,
  STMP_PASSWORD,
  CLIENT_URL,
  JWT_SECRET,
  SEND_GRID_API_KEY,
} from "../../config";

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(SEND_GRID_API_KEY);


// Verify a password reset token and return the user's email address
const verifyPasswordResetToken = (token) => {
    const secret = JWT_SECRET;
    try {
      const decoded: any = jwt.verify(token, secret);
      return decoded.email;
    } catch (error) {
      console.error("Error verifying password reset token:", error);
      return null;
    }
  };
  

export const handlePasswordReset = async (req, res) => {
    try {
      const { password } = req.body;
      const { token } = req.params;
      const email = verifyPasswordResetToken(token);
      const hashedPassword = bcrypt.hashSync(password, 10); // hash the password
  
      const user: any = await User.findOne({ email });
  
      if (!user) {
        throw new Error("No user found with this email address");
      }
  
      if (Date.now() > user.passwordResetTokenExpiration ) {
        throw new Error("Password reset token has expired");
      }
  
      await User.findOneAndUpdate(
        { email },
        {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetTokenExpiration: null,
        }
      );
  
      return res.send({ message: "Password reset successful" });
    } catch (error) {
      console.error("Error resetting password:", error);
      return res
        .status(500)
        .send({ error: error.message || "Internal server error" });
    }
  };