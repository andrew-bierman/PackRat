import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";
import User_Logs from "../../models/userLogs";
import User from "../../models/userModel";

const verifyUserToken = async (req, res, next) => {
  const userAndToken = req.headers.authorization?.split(" ")[1];

  if (!userAndToken) {
    res.status(400).send({ message: "invalid_token" });
  } else {
    console.log("entering verify user token...");
    const token = userAndToken;

    jwt.verify(token, JWT_SECRET, async (verify_err, decoded) => {
      if (!verify_err && decoded) {
        console.log("verified...");
        const user = await User.findOne({ _id: decoded._id });
        if (user) {
          let userLogPayload:any = {};
          try {
            userLogPayload.user_name = user.name;
            userLogPayload.path = req.baseUrl;
            userLogPayload.timestamp = Math.floor(Date.now() / 1000);
            await User_Logs.create(userLogPayload);
          } catch (error) {
            console.log(error);
          }
          if (next) return next();
          else return res.status(200).send({ message: "success" });
        } else return res.status(401).send({ message: "verification_failed" });
      } else return res.status(401).send({ message: "verification_failed" });
    });
  }
};

export default verifyUserToken;
