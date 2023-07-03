import { ItemCategoryModel } from "../models/itemCategory.js";
import Item from "../models/itemModel.js";
import Pack from "../models/packModel.js";
import { ItemCategory, ItemCategoryEnum } from "../utils/itemCategory.js";

export const getItems = async (req, res) => {
  try {
    const { packId } = req.params;

    const items = await Item.find({ packs: packId });

    return res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ msg: "Items cannot be found" });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { _id } = req.body;

    const item = await Item.findById({ _id });

    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ msg: "Item cannot be found" });
  }
};

export const addItem = async (req, res) => {
  try {
    const { name, weight, quantity, unit, packId, type } = req.body;

    let category = null;
    let newItem = null;

    switch (type) {
      case ItemCategoryEnum.FOOD: {
        category = await ItemCategoryModel.findOne({
          name: ItemCategoryEnum.FOOD,
        });

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
        category = await ItemCategoryModel.findOne({
          name: ItemCategoryEnum.WATER,
        });

        const existingWaterItems = await Item.find({ category: category._id, packs: packId });

        if (existingWaterItems && existingWaterItems.length > 0) {
          existingWaterItems[0].weight += Number(weight);  // Ensure weight is treated as a number
          await existingWaterItems[0].save();

          for (let i = 1; i < existingWaterItems.length; i++) {
            await Item.findByIdAndDelete(existingWaterItems[i]._id);
          }

          newItem = existingWaterItems[0];
        } else {
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
        category = await ItemCategoryModel.findOne({
          name: ItemCategoryEnum.ESSENTIALS,
        });

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

    await Pack.updateOne(
      { _id: packId },
      { $push: { items: newItem._id } }
    );

    const updatedItem = await Item.findByIdAndUpdate(
      newItem._id,
      {
        $addToSet: {
          owners: req.body.ownerId,
        },
      },
      { new: true }
    ).populate("category");

    res.status(200).json({
      msg: "success",
      newItem: updatedItem,
      packId: packId,
    });
  } catch (error) {
    res.status(404).json({ msg: "Unable to add item", error: error.message });
  }
};



export const editItem = async (req, res) => {
  try {
    const { _id } = req.body;

    const newItem = await Item.findOneAndUpdate({ _id }, req.body, {
      returnOriginal: false,
    });

    res.status(200).json(newItem);
  } catch (error) {
    res.status(404).json({ msg: "Unable to edit item" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.body;

    await Item.findOneAndDelete({ _id: itemId });

    res.status(200).json({ msg: "Item was deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Unable to delete item" });
  }
};

export const searchItemsByName = async (req, res) => {
  console.log(req.query.name);
  try {
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
