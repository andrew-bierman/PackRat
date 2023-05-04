import mongoose from "mongoose";
import Item from '../models/itemModel.js';
import Pack from '../models/packModel.js';

import { MONGODB_URI } from "../config.js";

console.log("Connecting to MongoDB:", MONGODB_URI)

const main = async () => {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Find all items with packId field
  const itemsToUpdate = await Item.find({ packId: { $exists: true } });

  console.log(`Found ${itemsToUpdate.length} items to update.`);

  for (const item of itemsToUpdate) {
    // Update the item's packs field with the packId value
    await Item.findByIdAndUpdate(
      item._id,
      {
        $set: {
          packs: [item.packId],
        },
        $unset: {
          packId: "",
        },
      },
      { new: true }
    );
  }

  console.log("Migration completed.");
  mongoose.connection.close();
};

main().catch((error) => {
  console.error("Error during migration:", error);
  process.exit(1);
});
