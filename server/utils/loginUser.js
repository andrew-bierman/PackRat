import User from "../models/userModel.js";

export const loginUser = async ({ email, password, from }) => {
  let user = []
  if (from === "UserSignIn") {
    user = await User.find({
      $and: [
        { "email": email.toLowerCase() },
        { "password": password }
      ]
    }).select("-password");

    if (!email || !password) {
      throw new Error("All fields must be filled");
    }
  }

  if (from === "GoogleSignIn") {
    user = await User.findOne({ "email": email.toLowerCase() }).select("-password");
    if (!email) {
      throw new Error("All fields must be filled");
    }
  }
  //Out of two signin methods.
  if (!(from === "GoogleSignIn" || from === "UserSignIn")) {
    throw new Error("Something went wrong");
  }

  if (user.length == 0) {
    throw new Error("Wrong email");
  }

  return user;
};
