import mongoose from "mongoose";
import Item from "./itemModel.js";
import myDB from "./dbConnection.js";

const { Schema } = mongoose;

const PackSchema = new Schema({
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
});

PackSchema.virtual("weightInPounds").get(function () {
  const totalWeightInGrams = this.total_weight;
  const weightInPounds = totalWeightInGrams / 453.59237; // 1 pound = 453.59237 grams
  return Math.round(weightInPounds * 100) / 100; // Round to two decimal places
});

PackSchema.virtual("weightInKilograms").get(function () {
  const totalWeightInGrams = this.total_weight;
  const weightInKilograms = totalWeightInGrams / 1000; // 1 kilogram = 1000 grams
  return Math.round(weightInKilograms * 100) / 100; // Round to two decimal places
});

PackSchema.virtual("weightInOunces").get(function () {
  const totalWeightInGrams = this.total_weight;
  const weightInOunces = totalWeightInGrams / 28.34952; // 1 ounce = 28.34952 grams
  return Math.round(weightInOunces * 100) / 100; // Round to two decimal places
});

PackSchema.virtual("foodWeightInGrams").get(function () {
  if (this.items && this.items.length > 0 && this.items[0] instanceof Item) {
    return this.items.reduce((total, item) => {
      let itemWeight = item.weight;
      // Convert item weight to grams based on the unit
      if (item.unit === "lb") {
        // Convert pounds to grams: 1 pound = 453.59237 grams
        itemWeight *= 453.59237;
      } else if (item.unit === "kg") {
        // Convert kilograms to grams: 1 kilogram = 1000 grams
        itemWeight *= 1000;
      } else if (item.unit === "oz") {
        // Convert ounces to grams: 1 ounce = 28.34952 grams
        itemWeight *= 28.34952;
      }
      // Consider only items tagged as food
      if (item.isFood) {
        return total + itemWeight * item.quantity;
      } else {
        return total;
      }
    }, 0);
  } else {
    return 0;
  }
});

PackSchema.virtual("waterVolumeInLiters").get(function () {
  if (this.items && this.items.length > 0 && this.items[0] instanceof Item) {
    return this.items.reduce((total, item) => {
      let itemVolume = item.volume;
      // Convert item volume to liters based on the unit
      if (item.unit === "gal") {
        // Convert gallons to liters: 1 gallon = 3.78541 liters
        itemVolume *= 3.78541;
      } else if (item.unit === "oz") {
        // Convert ounces to liters: 1 ounce = 0.02957 liters
        itemVolume *= 0.02957;
      }
      // Consider only items tagged as water
      if (item.isWater) {
        return total + itemVolume * item.quantity;
      } else {
        return total;
      }
    }, 0);
  } else {
    return 0;
  }
});

PackSchema.virtual("total_weight").get(function () {
  const foodWeightInGrams = this.foodWeightInGrams;
  const waterVolumeInGrams = this.waterVolumeInLiters * 1000; // 1 liter = 1000 grams
  return foodWeightInGrams + waterVolumeInGrams;
});

PackSchema.virtual("base_weight").get(function () {
  const foodWeightInGrams = this.foodWeightInGrams;
  const waterVolumeInGrams = this.waterVolumeInLiters * 1000; // 1 liter = 1000 grams
  return foodWeightInGrams + waterVolumeInGrams;
});

PackSchema.set("toObject", { virtuals: true });
PackSchema.set("toJSON", { virtuals: true });

const Pack = myDB.model("Pack", PackSchema);
export default Pack;
