import mongoose from 'mongoose';
import myDB from '../dbConnection';

const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    history: {
      type: String,
      // required: true,
    },
    itemTypeId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Conversation = myDB.model('Conversation', ConversationSchema);

export default Conversation;
