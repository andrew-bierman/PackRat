import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config.js";
import User_Logs from "../../models/userLogs.js";
import User from "../../models/userModel.js";

const verifyAdminToken = async (req, res, next) => {
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
          if(user.role=="admin"){
            let userLogPayload = {};
            try {
              userLogPayload.user_name = user.name;
              userLogPayload.path = req.baseUrl;
              userLogPayload.timestamp = Math.floor(Date.now() / 1000);
              await User_Logs.create(userLogPayload);
            } catch (error) {
              console.log(error);
            }
            if (next) return next();

          }
          else return res.status(403).send({ message: "Admin access is required to perform this action" });
        } else return res.status(401).send({ message: "verification_failed" });
      } else return res.status(401).send({ message: "verification_failed" });
    });
  }
};

export default verifyAdminToken;
