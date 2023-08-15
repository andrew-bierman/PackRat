import { ItemCategoryModel } from "../../models/itemCategory.ts";
import Item from "../../models/itemModel.ts";
import Pack from "../../models/packModel.ts";
import { ItemCategory, ItemCategoryEnum } from "../../utils/itemCategory.ts";

/**
 * Adds an item to the database based on the provided request body.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The updated item and pack ID.
 */
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

        let existingWaterItem = await Item.findOne({
          category: category._id,
          packs: packId,
        });

        if (existingWaterItem) {
          existingWaterItem.weight += Number(weight); // Ensure weight is treated as a number
          await existingWaterItem.save();
          newItem = existingWaterItem;
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
      { $addToSet: { items: newItem._id } }
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