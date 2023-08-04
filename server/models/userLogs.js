import mongoose from "mongoose";
import myDB from "./dbConnection.js";

const { Schema } = mongoose;

const User_LogsSchema = new Schema(
  {
    user_name: { type: String, required: true },
    path: { type: String, required: true },
    timestamp: { type: Number, required: true },
  },{
    versionKey:false
  }

);

// Create an index on the "user_name" field
User_LogsSchema.index({ user_name: 1 });


const User_Logs = myDB.model("User_Logs", User_LogsSchema);
export default User_Logs;
