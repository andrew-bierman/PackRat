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
  { timestamps: true }
);
// Create an index on the "userId" field
ConversationSchema.index({ userId: 1 });

const Conversation = myDB.model("Conversation", ConversationSchema);

export default Conversation;
