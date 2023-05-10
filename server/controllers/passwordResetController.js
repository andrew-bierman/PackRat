import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";
import User from '../models/userModel.js';
import { STMP_EMAIL, STMP_PASSWORD, CLIENT_URL, JWT_SECRET, SEND_GRID_API_KEY } from '../config.js';

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(SEND_GRID_API_KEY);

// Generate a password reset token that includes the user's email address
const generatePasswordResetToken = (email) => {
    const payload = { email };
    const secret = JWT_SECRET;
    const expiresIn = '1h';
    return jwt.sign(payload, secret, { expiresIn });
};

// Verify a password reset token and return the user's email address
const verifyPasswordResetToken = (token) => {
    const secret = JWT_SECRET;
    try {
        const decoded = jwt.verify(token, secret);
        return decoded.email;
    } catch (error) {
        console.error('Error verifying password reset token:', error);
        return null;
    }
};

// Send the password reset email with the reset token included in the URL
// const sendPasswordResetEmail = async (email, resetUrl) => {
//     const transporter = nodemailer.createTransport({
//         service: 'outlook',
//         auth: {
//             user: STMP_EMAIL,
//             pass: STMP_PASSWORD,
//         },
//     });

//     const mailOptions = {
//         from: `"PackRat Support" <${STMP_EMAIL}>"`,
//         to: email,
//         subject: 'Password Reset',
//         text: `Click the link below to reset your password:\n\n${resetUrl}\n\nIf you did not request to reset your password, please ignore this email.`,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Password reset email sent successfully');
//     } catch (error) {
//         console.error('Error sending password reset email:', error);
//     }
// };

const sendPasswordResetEmail = async (email, resetUrl) => {
    const mailOptions = {
        to: email,
        from: STMP_EMAIL,
        subject: 'Password Reset',
        text: `Click the link below to reset your password:\n\n${resetUrl}\n\nIf you did not request to reset your password, please ignore this email.`,
    };

    try {
        await sgMail.send(mailOptions);
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
};

export const requestPasswordResetEmailAndToken = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ error: 'No user found with this email address' });
        }

        const resetToken = generatePasswordResetToken(email);
        await User.findOneAndUpdate({ email }, { passwordResetToken: resetToken, passwordResetTokenExpiration: Date.now() + (24 * 60 * 60 * 1000) });

        const resetUrl = `${CLIENT_URL}/password-reset?token=${resetToken}`;
        sendPasswordResetEmail(email, resetUrl);

        return res.send({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
};

export const handlePasswordReset = async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.params;
        const email = verifyPasswordResetToken(token);
        const hashedPassword = bcrypt.hashSync(password, 10); // hash the password

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('No user found with this email address');
        }

        if (Date.now() > user.passwordResetTokenExpiration) {
            throw new Error('Password reset token has expired');
        }

        await User.findOneAndUpdate({ email }, { password: hashedPassword, passwordResetToken: null, passwordResetTokenExpiration: null });

        return res.send({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).send({ error: error.message || 'Internal server error' });
    }
};
