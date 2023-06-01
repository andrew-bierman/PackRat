import mongoose from "mongoose";
import Item from "../models/itemModel.js";
import Pack from "../models/packModel.js";

import { MONGODB_URI } from "../config.js";

const main = async () => {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Find all items with packs field but empty owners field
  const itemsToUpdate = await Item.find({
    packs: { $exists: true, $not: { $size: 0 } },
    owners: { $exists: false },
  });

  console.log(`Found ${itemsToUpdate.length} items to update.`);

  for (const item of itemsToUpdate) {
    // Get the associated packs
    const associatedPacks = await Pack.find({ _id: { $in: item.packs } });

    // Extract the owner_ids from the associated packs
    const ownerIds = associatedPacks.map((pack) => pack.owner_id);

    // Update the item's owners field
    await Item.findByIdAndUpdate(
      item._id,
      {
        $set: {
          owners: ownerIds,
        },
      },
      { new: true }
    );
  }

  console.log("Item owners migration completed.");

  // Find all packs that do not have the owners field or have an empty owners field
  const packsToUpdate = await Pack.find({
    $or: [{ owners: { $exists: false } }, { owners: { $size: 0 } }],
  });

  console.log(`Found ${packsToUpdate.length} packs to update.`);

  for (const pack of packsToUpdate) {
    // Update the pack's owners field with the owner_id value
    await Pack.findByIdAndUpdate(
      pack._id,
      {
        $set: {
          owners: [pack.owner_id],
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
