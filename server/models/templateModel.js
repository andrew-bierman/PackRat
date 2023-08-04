import mongoose from "mongoose";
const { Schema } = mongoose;

import myDB from "./dbConnection.js";

const TemplateSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["pack", "trip", "item"],
      required: true,
    },
    templateId: { type: Schema.Types.ObjectId, required: true },
    isGlobalTemplate: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
// Create an index on the "type" field
TemplateSchema.index({ type: 1 });

// Create an index on the "templateId" field
TemplateSchema.index({ templateId: 1 });

// Create an index on the "createdBy" field
TemplateSchema.index({ createdBy: 1 });

const Template = myDB.model("Template", TemplateSchema);

export default Template;
