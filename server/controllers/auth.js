// Import necessary modules and User model
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

// Function to check if the provided code matches the user's email in the database
export const checkCode = async (req, res) => {
  const { email, code } = req.body;
  try {
    // Find the user with the provided email and code in the database
    let user = await User.find({
      $and: [{ email: email.toLowerCase() }, { code: code }],
    });

    // Check if a user with the provided email and code exists
    if (user.length) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(200).json({ message: "Incorrect code" });
    }
  } catch (error) {
    res.status(404).json({ message: "Server Error" });
  }
};

// Function to check if the provided email exists in the database and send a verification code via email
export const emailExists = async (req, res) => {
  const { email } = req.body;
  try {
    // Find the user with the provided email in the database
    let val = await User.find({ email: email.toLowerCase() });

    // Check if a user with the provided email exists
    if (val.length) {
      // If the user exists, send a verification code via email
      sendEmailNotice(email).then(async (result1) => {
        if (result1.status) {
          let { newcode } = result1;
          // Update the user's code with the new verification code in the database
          User.findOneAndUpdate(
            { email: email.toLowerCase() },
            { code: newcode },
            {
              returnOriginal: false,
            }
          )
            .then((result2) => {
              console.log(result2.email);
              if (result2.code) {
                res.status(200).json({ message: "success" });
              }
            })
            .catch(() => {
              res.status(200).json({ message: "Unable to send code" });
            });
        } else {
          res.status(200).json({ message: "Unable to send code" });
        }
      });
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Server Error" });
  }
};

// Function to update the user's password in the database
export const updatePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Update the user's password in the database
    let val = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { password: password },
      {
        returnOriginal: false,
      }
    );

    // Check if the password update was successful
    if (val.email) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(200).json({ message: "Unable to update password" });
    }
  } catch (error) {
    res.status(404).json({ message: "Server Error" });
  }
};

// Function to send a verification code via email
async function sendEmailNotice(email) {
  return new Promise((resolve, reject) => {
    // Generate a new verification code
    var newcode = Math.floor(Math.random() * 999999 + 111111);

    // Create a transporter for sending emails using nodemailer with Gmail SMTP
    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL, // Replace with the Gmail email address from environment variables
          pass: process.env.APPPASSWORD, // Replace with the Gmail app password from environment variables
        },
      })
    );

    // Set the mail options for the email
    var mailOptions = {
      from: "Hailemelekot@gmail.com", // Replace with the sender email address
      to: email, // Recipient's email address
      subject: "PackRat verification code",
      text: "Your verification code is " + newcode,
    };

    // Send the email with the verification code
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // If there's an error in sending the email, resolve the promise with status false
        resolve({ status: false });
      } else {
        // If the email is sent successfully, resolve the promise with status true and the new verification code
        resolve({ status: true, newcode: newcode });
      }
    });
  });
}
