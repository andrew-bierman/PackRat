import { ItemCategoryModel } from "../models/itemCategory.js";
import Item from "../models/itemModel.js";
import Pack from "../models/packModel.js";
import { ItemCategory, ItemCategoryEnum } from "../utils/itemCategory.js";

// Function to get items for a specific pack based on packId
export const getItems = async (req, res) => {
  try {
    const { packId } = req.params;

    // Find items in the database that belong to the specified packId
    const items = await Item.find({ packs: packId });

    return res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ msg: "Items cannot be found" });
  }
};

// Function to get item details by item id
export const getItemById = async (req, res) => {
  try {
    const { _id } = req.body;

    // Find the item in the database by its _id
    const item = await Item.findById({ _id });

    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ msg: "Item cannot be found" });
  }
};

// Function to add an item to a pack
export const addItem = async (req, res) => {
  try {
    const { name, weight, quantity, unit, packId, type } = req.body;

    // Initialize variables for category and newItem
    let category = null;
    let newItem = null;

    // Switch case based on the type of item (food, water, or essentials)
    switch (type) {
      case ItemCategoryEnum.FOOD: {
        // Find the category with the name "food" in the database
        category = await ItemCategoryModel.findOne({
          name: ItemCategoryEnum.FOOD,
        });

        // Create a new item in the database with the provided details
        newItem = await Item.create({
          name,
          weight,
          quantity,
          unit,
          packs: [packId],
          category: category._id,
        });

        break;
      }
      case ItemCategoryEnum.WATER: {
        // Find the category with the name "water" in the database
        category = await ItemCategoryModel.findOne({
          name: ItemCategoryEnum.WATER,
        });

        // Check if a water item already exists in the pack
        let existingWaterItem = await Item.findOne({
          category: category._id,
          packs: packId,
        });

        if (existingWaterItem) {
          // If a water item already exists, update its weight by adding the new weight
          existingWaterItem.weight += Number(weight); // Ensure weight is treated as a number
          await existingWaterItem.save();
          newItem = existingWaterItem;
        } else {
          // If a water item doesn't exist, create a new item in the database
          newItem = await Item.create({
            name,
            weight,
            quantity: 1,
            unit,
            packs: [packId],
            category: category._id,
          });
        }

        break;
      }
      default: {
        // For all other item types (essentials), use the "essentials" category
        category = await ItemCategoryModel.findOne({
          name: ItemCategoryEnum.ESSENTIALS,
        });

        // Create a new item in the database with the provided details
        newItem = await Item.create({
          name,
          weight,
          quantity,
          unit,
          packs: [packId],
          category: category._id,
        });

        break;
      }
    }

    // Update the pack to include the newly added item
    await Pack.updateOne(
      { _id: packId },
      { $addToSet: { items: newItem._id } }
    );

    // Update the newItem with the ownerId
    const updatedItem = await Item.findByIdAndUpdate(
      newItem._id,
      {
        $addToSet: {
          owners: req.body.ownerId,
        },
      },
      { new: true }
    ).populate("category");

    // Send the response with the updated item and packId
    res.status(200).json({
      msg: "success",
      newItem: updatedItem,
      packId: packId,
    });
  } catch (error) {
    res.status(404).json({ msg: "Unable to add item", error: error.message });
  }
};

// Function to edit an existing item
export const editItem = async (req, res) => {
  try {
    const { _id, name, weight, unit, quantity, type } = req.body;

    // Find the category with the specified type in the database
    const category = await ItemCategoryModel.findOne({
      name: type,
    });

    // Update the item in the database with the new details
    let newItem = await Item.findOneAndUpdate(
      { _id },
      {
        name,
        weight,
        unit,
        quantity,
        category: category.id,
      },
      {
        returnOriginal: false,
      }
    ).populate("category", "name");

    // Send the response with the updated item
    res.status(200).json(newItem);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit item" });
  }
};

// Function to delete an item
export const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const { packId } = req.body;
    let itemDeleted;

    // Find the item in the database by its itemId
    const item = await Item.findById(itemId);

    if (item.global) {
      // If the item is global, remove it from the pack list and update the individual item
      await Pack.updateOne({ _id: packId }, { $pull: { items: itemId } });
      await Item.updateOne(
        {
          _id: itemId,
        },
        {
          $pull: {
            packs: packId,
          },
        }
      );
      itemDeleted = await Item.findById(itemId);
    } else {
      // If the item is not global, delete the item from the database
      itemDeleted = await Item.findByIdAndDelete({ _id: itemId });
    }

    // Send the response with the deleted item
    res.status(200).json(itemDeleted);
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Unable to delete item" + error.message });
  }
};

// Function to delete a global item
export const deleteGlobalItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Find the global item in the database by its itemId and delete it
    const itemDeleted = await Item.findByIdAndDelete(itemId);

    // Send the response with the deleted item
    res.status(200).json({
      data: itemDeleted,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Unable to delete item " + error.message });
  }
};

// Function to search items by name
export const searchItemsByName = async (req, res) => {
  console.log(req.query.name);
  try {
    // Find items in the database whose names match the search query (case-insensitive)
    const items = await Item.find({
      name: { $regex: `.*${req.query.name}.*`, $options: "i" },
    });
    res.status(200).json(items);
  } catch (error) {
    res
      .status(404)
      .json({ msg: "Items cannot be found", "req.query": req.query });
  }
};

// Function to add a global item
export const addItemGlobal = async (req, res) => {
  try {
    const { name, weight, quantity, unit, type } = req.body;

    // Initialize variables for category and newItem
    let category = null;
    let newItem = null;

    // Switch case based on the type of global item (food, water, or essentials)
    switch (type) {
      case ItemCategoryEnum.FOOD: {
        // Find the category with the name "food" in the database
        category = await ItemCategoryModel.findOne({
          name: ItemCategoryEnum.FOOD,
        });

        // Create a new global item in the database with the provided details
        newItem = await Item.create({
          name,
          weight,
          quantity,
          unit,
          category: category._id,
          global: true,
        });
        newItem = await Item.findById(newItem.id).populate("category", "name");

        break;
      }
      case ItemCategoryEnum.WATER: {
        // Find the category with the name "water" in the database
        category = await ItemCategoryModel.findOne({
          name: ItemCategoryEnum.WATER,
        });

        // Create a new global item in the database with the provided details
        newItem = await Item.create({
          name,
          weight,
          quantity: 1,
          unit,
          category: category._id,
          global: true,
        });
        newItem = await Item.findById(newItem.id).populate("category", "name");
        break;
      }
      default: {
        // For all other global item types (essentials), use the "essentials" category
        category = await ItemCategoryModel.findOne({
          name: ItemCategoryEnum.ESSENTIALS,
        });

        // Create a new global item in the database with the provided details
        newItem = await Item.create({
          name,
          weight,
          quantity,
          unit,
          category: category._id,
          global: true,
        });

        newItem = await Item.findById(newItem.id).populate("category", "name");

        break;
      }
    }

    // Send the response with the newly added global item
    res.status(200).json({
      msg: "success",
      newItem: newItem,
    });
  } catch (error) {
    res.status(404).json({ msg: "Unable to add item", error: error.message });
  }
};

// Function to get global items with pagination
export const getItemsGlobally = async (req, res) => {
  try {
    let { search, limit, page } = req.query;
    const totalItems = await Item.countDocuments(
      search
        ? { name: { $regex: search, $options: "i" }, global: true }
        : { global: true }
    );

    if (search) {
      limit = Number(limit) || totalItems;
      page = Number(page) || 1;
    } else {
      limit = totalItems;
      page = 1;
    }

    const startIndex = (page - 1) * limit;

    // Find global items in the database with pagination and sort by createdAt in descending order
    const itemsQuery = search
      ? Item.find({ name: { $regex: search, $options: "i" }, global: true })
      : Item.find({ global: true });
    const items = await itemsQuery
      .populate("category", "name")
      .skip(startIndex)
      .limit(limit)
      .sort({
        createdAt: -1,
      });
    const totalPages = Math.ceil(totalItems / limit);

    // Send the response with global items, current page, and total pages
    return res.status(200).json({
      items,
      page,
      totalPages,
    });
  } catch (error) {
    res.status(404).json({ msg: "Items cannot be found" });
  }
};

// Function to add a global item to a specific pack
export const addGlobalItemToPack = async (req, res) => {
  try {
    const { packId } = req.params;
    const { itemId } = req.body;
    const { ownerId } = req.body;

    // Find the global item in the database by its itemId and populate the category
    const item = await Item.findById(itemId).populate("category", "name");

    // Update the pack to include the newly added global item
    await Pack.updateOne({ _id: packId }, { $addToSet: { items: item._id } });

    // Update the global item with the ownerId
    await Item.findByIdAndUpdate(
      item._id,
      {
        $addToSet: {
          owners: ownerId,
        },
      },
      { new: true }
    );

    // Update the global item with the packId
    await Item.findByIdAndUpdate(
      item._id,
      {
        $addToSet: {
          packs: packId,
        },
      },
      { new: true }
    );

    // Send the response with the updated global item
    return res.status(200).json({ message: "succesfully updated", data: item });
  } catch (error) {
    res.status(404).json({ msg: "Items cannot be found" });
  }
};

// Function to edit a global item and add it as a duplicate to a specific pack
export const editGlobalItemAsDuplicate = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { packId, name, weight, quantity, unit, type } = req.body;

    // Find the category with the specified type in the database
    let category = await ItemCategoryModel.findOne({
      name: type,
    });

    // Duplicate the global item with new changes and add it to the pack
    let newItem = await Item.create({
      name,
      weight,
      unit,
      quantity,
      category: category._id,
      global: false,
      packs: [packId],
    });
    newItem = await Item.findById(newItem._id).populate("category", "name");

    // Add the new item to the pack list
    await Pack.updateOne(
      { _id: packId },
      { $addToSet: { items: newItem._id } }
    );

    // Remove the original global item from the pack list
    await Pack.updateOne({ _id: packId }, { $pull: { items: itemId } });

    // Update the individual item to remove the packId
    await Item.updateOne(
      {
        _id: itemId,
      },
      {
        $pull: {
          packs: packId,
        },
      }
    );

    // Send the response with the newly added duplicate item
    return res.status(200).json(newItem);
  } catch (error) {
    res.status(404).json({ msg: "Items cannot be found" });
  }
};
