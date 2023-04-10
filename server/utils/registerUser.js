import User from "../models/userModel.js";

export const register = async ({ email, password, name }) => {
  if (!email || !password || !name) {
    throw new Error("All fields must be filled");
  }

  const exist = await User?.findOne({ email });

  if (exist) {
    throw new Error("email already in use");
  }

  // validation

  const user = await User.create({
    name,
    password,
    email,
    is_certified_guide: false,
    favorites: [],
    packs: [],
    trips: [],
  });
  return user;
};
