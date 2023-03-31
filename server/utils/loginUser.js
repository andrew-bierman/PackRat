import User from "../models/userModel.js";

export const loginUser = async ({ email, password, from }) => {
  if (from === "UserSignIn") {
    if (!email || !password) {
      throw new Error("All fields must be filled");
    }
  }

  if (from === "GoogleSignIn") {
    if (!email) {
      throw new Error("All fields must be filled");
    }
  }
  //Out of two signin methods.
  if (!(from === "GoogleSignIn" || from === "UserSignIn")) {
    throw new Error("Something went wrong");
  }

  const user = await User.findOne({ email }).select("-password");

  if (!user) {
    throw new Error("Wrong email");
  }

  return user;
};
