import mongoose from "mongoose";
import myDB from "../dbConnection.js";

const { Schema } = mongoose;

const ConversationSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    history: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Conversation = myDB.model("Conversation", ConversationSchema);

export default Conversation;
