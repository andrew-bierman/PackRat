import mongoose from "mongoose";
import myDB from "./dbConnection.js";
import Item from "./itemModel.js";

const { Schema } = mongoose;

const PackSchema = new Schema(
  {
    name: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    owner_id: { type: Schema.Types.ObjectId, ref: "User" },
    is_public: { type: Boolean },
    favorited_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
    favorites_count: { type: Number },
    createdAt: String,
    owners: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    grades: {
      type: Object,
      default: {
        weight: "", // Initialize with an empty string
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
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Calculate the total weight of items in ounces
PackSchema.virtual("totalWeightInOunces").get(function () {
  const totalWeightInGrams = this.totalWeightInGrams;
  const weightInOunces = totalWeightInGrams / 28.34952; // 1 ounce = 28.34952 grams
  return Math.round(weightInOunces * 100) / 100; // Round to two decimal places
});

// Calculate the total weight of items in pounds
PackSchema.virtual("totalWeightInPounds").get(function () {
  const totalWeightInGrams = this.totalWeightInGrams;
  const weightInPounds = totalWeightInGrams / 453.59237; // 1 pound = 453.59237 grams
  return Math.round(weightInPounds * 100) / 100; // Round to two decimal places
});

// Calculate the total weight of items in kilograms
PackSchema.virtual("totalWeightInKilograms").get(function () {
  const totalWeightInGrams = this.totalWeightInGrams;
  const weightInKilograms = totalWeightInGrams / 1000; // 1 kilogram = 1000 grams
  return Math.round(weightInKilograms * 100) / 100; // Round to two decimal places
});

PackSchema.virtual("Total_weight").get(function () {
  let totalWeight = this.waterAndFood;

  // Iterate over each item in the pack
  for (const item of this.items) {
    if (item.unit === "lb") {
      totalWeight += item.originalWeight * 453.59237; // Convert pounds to grams
    } else if (item.unit === "kg") {
      totalWeight += item.originalWeight * 1000; // Convert kilograms to grams
    } else if (item.unit === "oz") {
      totalWeight += item.originalWeight * 28.34952; // Convert ounces to grams
    } else {
      totalWeight += item.originalWeight; // Assume weight is already in grams if unit is not recognized
    }
  }

  return totalWeight;
});

PackSchema.virtual("baseWeight").get(function () {
  let baseWeight = 0;

  // Iterate over each item in the pack
  for (const item of this.items) {
    if (item.isFood || item.isWater) {
      continue; // Skip food and water items
    }

    // Add the weight of non-food and non-water items to the base weight
    if (item.unit === "lb") {
      baseWeight += item.originalWeight * 453.59237; // Convert pounds to grams
    } else if (item.unit === "kg") {
      baseWeight += item.originalWeight * 1000; // Convert kilograms to grams
    } else if (item.unit === "oz") {
      baseWeight += item.originalWeight * 28.34952; // Convert ounces to grams
    } else {
      baseWeight += item.originalWeight; // Assume weight is already in grams if unit is not recognized
    }
  }

  return baseWeight;
});

PackSchema.virtual("waterAndFood").get(function () {
  let waterAndFood = 0;

  // Iterate over each item in the pack
  for (const item of this.items) {
    if (item.isFood || item.isWater) {
      if (item.unit === "lb") {
        waterAndFood += item.originalWeight * 453.59237; // Convert pounds to grams
      } else if (item.unit === "kg") {
        waterAndFood += item.originalWeight * 1000; // Convert kilograms to grams
      } else if (item.unit === "oz") {
        waterAndFood += item.originalWeight * 28.34952; // Convert ounces to grams
      } else {
        waterAndFood += item.originalWeight; // Assume weight is already in grams if unit is not recognized
      }
    }
  }

  return waterAndFood;
});

PackSchema.virtual("totalWeightInGrams").get(function () {
  let totalWeight = this.baseWeight + this.waterAndFood;

  // Iterate over each item in the pack
  for (const item of this.items) {
    if (item.unit === "lb") {
      totalWeight += item.originalWeight * 453.59237; // Convert pounds to grams
    } else if (item.unit === "kg") {
      totalWeight += item.originalWeight * 1000; // Convert kilograms to grams
    } else if (item.unit === "oz") {
      totalWeight += item.originalWeight * 28.34952; // Convert ounces to grams
    } else {
      totalWeight += item.originalWeight; // Assume weight is already in grams if unit is not recognized
    }
  }

  return totalWeight;
});

const Pack = myDB.model("Pack", PackSchema);
export default Pack;
