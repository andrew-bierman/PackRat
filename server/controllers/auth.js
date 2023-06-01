import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

export const checkCode = async (req, res) => {
  const { email, code } = req.body;
  try {
    let user = await User.find({
      $and: [{ email: email.toLowerCase() }, { code: code }],
    });
    if (user.length) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(200).json({ message: "Incorrect code" });
    }
  } catch (error) {
    res.status(404).json({ message: "Server Error" });
  }
};

export const emailExists = async (req, res) => {
  const { email } = req.body;
  try {
    let val = await User.find({ email: email.toLowerCase() });
    if (val.length) {
      sendEmailNotice(email).then(async (result1) => {
        if (result1.status) {
          let { newcode } = result1;
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

export const updatePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    let val = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { password: password },
      {
        returnOriginal: false,
      }
    );
    if (val.email) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(200).json({ message: "Unable to update password" });
    }
  } catch (error) {
    res.status(404).json({ message: "Server Error" });
  }
};

async function sendEmailNotice(email) {
  return new Promise((resolve, reject) => {
    var newcode = Math.floor(Math.random() * 999999 + 111111);
    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.APPPASSWORD,
        },
      })
    );

    var mailOptions = {
      from: "Hailemelekot@gmail.com",
      to: email,
      subject: "PackRat verification code",
      text: "Your verification code is " + newcode,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        resolve({ status: false });
      } else {
        resolve({ status: true, newcode: newcode });
      }
    });
  });
}
