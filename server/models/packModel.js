import mongoose from "mongoose";
import Item from "./itemModel.js";
import myDB from "./dbConnection.js";

const { Schema } = mongoose;

const PackSchema = new Schema(
  {
    name: { type: String, required: true },
    items: [],
    owner_id: { type: Schema.Types.ObjectId, ref: "User" },
    is_public: { type: Boolean },
    favorited_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
    favorites_count: { type: Number },
    createdAt: String,
    owners: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    grades: {
      type: Object,
      default: {
        weight: "",
        essentialItems: "",
        redundancyAndVersatility: "",
      },
    },
    scores: {
      type: Object,
      default: {
        weightScore: 0,
        essentialItemsScore: 0,
        redundancyAndVersatilityScore: 0,
      },
    },
    type: { type: String, default: "pack" },
  },
  { timestamps: true }
);

PackSchema.virtual("total_weight").get(function () {
  if (this.items && this.items.length > 0 && this.items[0] instanceof Item) {
    return this.items.reduce(
      (total, item) => total + item.weight * item.quantity,
      0
    );
  } else {
    return 0;
  }
});

PackSchema.virtual("totalScore").get(function () {
  const scoresArray = Object.values(this.scores);
  const sum = scoresArray.reduce((total, score) => total + score, 0);
  const average = scoresArray.length > 0 ? sum / scoresArray.length : 0;

  return Math.round(average * 100) / 100;
});

PackSchema.set("toObject", { virtuals: true });
PackSchema.set("toJSON", { virtuals: true });

const Pack = myDB.model("Pack", PackSchema);
export default Pack;
