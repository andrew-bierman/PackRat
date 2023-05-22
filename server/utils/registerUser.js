import User from "../models/userModel.js";

export const register = async ({ email, password, name, from }) => {
  if (from === "UserSignIn") {
    if (!email || !password || !name) {
      throw new Error("All fields must be filled");
    }
  }

  if (from === "GoogleSignIn") {
    if (!email || !name) {
      throw new Error("All fields must be filled");
    }
  }

  if (!(from === "GoogleSignIn" || from === "UserSignIn")) {
    throw new Error("Something went wrong");
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

export const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
