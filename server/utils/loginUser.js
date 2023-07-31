import User from "../models/userModel.js";

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await User.findOne({ email }).select("-password");

  if (!user) {
    throw new Error("Wrong email");
  }

  return user;
};
